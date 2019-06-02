from core import app
from flask_cachebuster import CacheBuster

config = { 'extensions': ['.js', '.css', '.png', '.jpg', '.jpeg'], 'hash_size': 5 }

cache_buster = CacheBuster(config=config)

cache_buster.init_app(app)

if __name__ == '__main__':
    app.run(debug=True)
