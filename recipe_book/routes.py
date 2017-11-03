from recipe_book import handlers
from cytoolz import partial


def add_route(app, method, path, handler):
    app.router.add_route(method, path, handler)


def create_routes(app):
    route = partial(add_route, app)

    route('GET', '/', handlers.index)
    route('GET', '/api/recipes', handlers.get_recipes)
    route('GET', '/api/recipes/{r_id}', handlers.get_recipe)
    route('POST', '/api/recipes', handlers.create_recipe)
    route('DELETE', '/api/recipes/{r_id}', handlers.delete_recipe)

    route('GET', '/api/ingredients', handlers.get_ingredients)
    route('GET', '/api/ingredients/{keyword}', handlers.get_ingredient)
    route('POST', '/api/ingredients', handlers.create_ingredient)
    route('DELETE', '/api/ingredients/{keyword}', handlers.delete_ingredient)
