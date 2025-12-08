"""
Управление транзакциями KLAB
Получение истории, создание новых транзакций, обновление балансов
"""
import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from decimal import Decimal

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    user_id = event.get('headers', {}).get('X-User-Id')
    if not user_id:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'User ID required'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cursor.execute(
                "SELECT * FROM transactions WHERE user_id = %s ORDER BY created_at DESC LIMIT 50",
                (user_id,)
            )
            transactions = cursor.fetchall()
            
            result = []
            for tx in transactions:
                tx_dict = dict(tx)
                if 'amount' in tx_dict and isinstance(tx_dict['amount'], Decimal):
                    tx_dict['amount'] = float(tx_dict['amount'])
                if 'price' in tx_dict and isinstance(tx_dict['price'], Decimal):
                    tx_dict['price'] = float(tx_dict['price'])
                if 'created_at' in tx_dict:
                    tx_dict['created_at'] = tx_dict['created_at'].isoformat()
                result.append(tx_dict)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'transactions': result}),
                'isBase64Encoded': False
            }
        
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            tx_type = body.get('type')
            amount = body.get('amount')
            price = body.get('price')
            to_address = body.get('to_address')
            from_address = body.get('from_address')
            
            if not tx_type or not amount:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Type and amount required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "INSERT INTO transactions (user_id, type, amount, price, to_address, from_address) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *",
                (user_id, tx_type, amount, price, to_address, from_address)
            )
            transaction = cursor.fetchone()
            conn.commit()
            
            tx_dict = dict(transaction)
            if 'amount' in tx_dict and isinstance(tx_dict['amount'], Decimal):
                tx_dict['amount'] = float(tx_dict['amount'])
            if 'price' in tx_dict and isinstance(tx_dict['price'], Decimal):
                tx_dict['price'] = float(tx_dict['price'])
            if 'created_at' in tx_dict:
                tx_dict['created_at'] = tx_dict['created_at'].isoformat()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'transaction': tx_dict}),
                'isBase64Encoded': False
            }
        
        if method == 'PUT':
            body = json.loads(event.get('body', '{}'))
            balance_usd = body.get('balance_usd')
            balance_klab = body.get('balance_klab')
            
            if balance_usd is None or balance_klab is None:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Both balances required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "UPDATE users SET balance_usd = %s, balance_klab = %s WHERE id = %s RETURNING id, username, balance_usd, balance_klab",
                (balance_usd, balance_klab, user_id)
            )
            user = cursor.fetchone()
            conn.commit()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found'}),
                    'isBase64Encoded': False
                }
            
            user_dict = dict(user)
            if 'balance_usd' in user_dict and isinstance(user_dict['balance_usd'], Decimal):
                user_dict['balance_usd'] = float(user_dict['balance_usd'])
            if 'balance_klab' in user_dict and isinstance(user_dict['balance_klab'], Decimal):
                user_dict['balance_klab'] = float(user_dict['balance_klab'])
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'user': user_dict}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
