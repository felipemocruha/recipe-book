from recipe_book import handlers, routes
from aiohttp import web
from aiohttp_jinja2 import setup
import jinja2
import uvloop
import asyncio


def create_app(env):
    app = web.Application()
    setup(app, loader=jinja2.FileSystemLoader('recipe_book/templates'))
    routes.create_routes(app)

    return app
