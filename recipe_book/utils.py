from recipe_book.models import Ingredient, Recipe

import edn_format as edn
from cytoolz import partial, dissoc

from collections import namedtuple
import os


def parse_recipe(recipe_str):
    parsed = edn.loads('{' + recipe_str + '}')
    parse_kws = lambda d: {k.name: d.dict[k] for k in d.dict.keys()}
    recipe = parse_kws(parsed)
    ings = parse_ingredients(recipe['ingredients'])
    title = edn.dumps(recipe['title'])

    return {
        'title': title,
        'ingredients': ings,
        'description': recipe['description']
    }


def parse_ingredients(ings):
    Quant = namedtuple('Quant', 'quant unit keyword')
    parse_ing = lambda ing: [edn.dumps(item) for item in ing]

    return [Quant(*parse_ing(i)) for i in ings]


def create_ingredient(name, kw, ing_model=Ingredient):
    ingredient = ing_model(name=name, keyword=kw)
    ingredient.save()
    return ingredient


def delete_ingredient(keyword, ing_model=Ingredient):
    return ing_model.nodes.filter(keyword=keyword).delete()


def get_ingredient(keyword, ing_model=Ingredient):
    return [*ing_model.nodes.filter(keyword=keyword)][0]


def get_ingredients(ing_model=Ingredient):
    return [ing.to_dict() for ing in ing_model.nodes.all()]


def connect_ingredient(recipe, ing):
    relationship = {'quant': ing.quant, 'unit': ing.unit}
    recipe.requires.connect(get_ingredient(ing.keyword), relationship)


def get_recipe(r_id, recipe_model=Recipe):
    return recipe_model.nodes.filter(r_id=r_id)[0]


def get_recipes(recipe_model=Recipe):
    return [recipe.to_dict() for recipe in recipe_model.nodes.all()]


def create_recipe(data, recipe_model=Recipe):
    ingredients = [get_ingredient(i.keyword) for i in data['ingredients']]
    recipe = recipe_model(**dissoc(data, 'ingredients')).save()
    [*map(partial(connect_ingredient, recipe), data['ingredients'])]

    return recipe


def delete_recipe(r_id, recipe_model=Recipe):
    return get_recipe(r_id).delete()


def get_env_vars(getenv=os.getenv):
    return {
        'DB_USER': getenv('DB_USER', 'neo4j'),
        'DB_PASSWORD': getenv('DB_PASSWORD', 'admin')
    }
