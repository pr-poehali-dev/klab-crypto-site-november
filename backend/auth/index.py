"""
Аутентификация пользователей KLAB
Регистрация, вход, получение данных пользователя
"""
import json
import os
import hashlib
from typing import Dict, Any
from decimal import Decimal
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'POST':
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            username = body.get('username', '').strip()
            password = body.get('password', '')
            
            if not username or not password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Username and password required'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            
            if action == 'register':
                cursor.execute(
                    "SELECT id FROM users WHERE username = %s",
                    (username,)
                )
                if cursor.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Username already exists'}),
                        'isBase64Encoded': False
                    }
                
                cursor.execute(
                    "INSERT INTO users (username, password_hash) VALUES (%s, %s) RETURNING id, username, balance_usd, balance_klab",
                    (username, password_hash)
                )
                user = cursor.fetchone()
                conn.commit()
                
                user_dict = dict(user)
                if 'balance_usd' in user_dict and isinstance(user_dict['balance_usd'], Decimal):
                    user_dict['balance_usd'] = float(user_dict['balance_usd'])
                if 'balance_klab' in user_dict and isinstance(user_dict['balance_klab'], Decimal):
                    user_dict['balance_klab'] = float(user_dict['balance_klab'])
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'user': user_dict
                    }),
                    'isBase64Encoded': False
                }
            
            elif action == 'login':
                cursor.execute(
                    "SELECT id, username, balance_usd, balance_klab FROM users WHERE username = %s AND password_hash = %s",
                    (username, password_hash)
                )
                user = cursor.fetchone()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Invalid credentials'}),
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
                    'body': json.dumps({
                        'success': True,
                        'user': user_dict
                    }),
                    'isBase64Encoded': False
                }
        
        if method == 'GET':
            user_id = event.get('headers', {}).get('X-User-Id')
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User ID required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT id, username, balance_usd, balance_klab FROM users WHERE id = %s",
                (user_id,)
            )
            user = cursor.fetchone()
            
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