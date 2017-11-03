from recipe_book import utils
from aiohttp_jinja2 import template
from aiohttp import web


@template('index.html')
async def index(request):
    return {'debug': True}


async def get_recipes(request, utils=utils):
    return web.json_response(utils.get_recipes())


async def get_recipe(request):
    r_id = request.match_info['r_id']
    return web.json_response(utils.get_recipe(r_id).to_dict())


async def create_recipe(request):
    data = await request.json()
    utils.create_recipe(utils.parse_recipe(data))
    return web.Response(body='', status=201)


async def delete_recipe(request):
    r_id = request.match_info['r_id']
    utils.delete_recipe(r_id)
    return web.Response(body='', status=204)


async def get_ingredients(request, utils=utils):
    return web.json_response(utils.get_ingredients())


async def get_ingredient(request, utils=utils):
    kw = request.match_info['keyword']
    return web.json_response(utils.get_ingredient(':' + kw).to_dict())


async def create_ingredient(request, utils=utils):
    data = await request.json()
    utils.create_ingredient(data['name'], data['keyword'])
    return web.Response(body='', status=201)


async def delete_ingredient(request, utils=utils):
    kw = request.match_info['keyword']
    utils.delete_ingredient(kw)
    return web.Response(body='', status=204)
