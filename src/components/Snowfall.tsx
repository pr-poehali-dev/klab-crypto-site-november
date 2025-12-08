import { useEffect } from 'react';

const Snowfall = () => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.textContent = '❄';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 5 + 's';
      snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
      snowflake.style.opacity = (Math.random() * 0.5 + 0.5).toString();
      
      document.body.appendChild(snowflake);
      
      setTimeout(() => {
        snowflake.remove();
      }, 8000);
    };

    const interval = setInterval(createSnowflake, 200);
    
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Snowfall;
