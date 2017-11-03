from recipe_book import utils, create_app
from recipe_book.models import create_db_conn
from aiohttp import web
import uvloop
import asyncio
import sys


if __name__ == '__main__':
    asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
    env = utils.get_env_vars()
    create_db_conn(env)
    app = create_app(env)
    web.run_app(app)
