from pyparsing import *
from cytoolz import *
import re
import sys


def get_ing_dict():
    return {
        ':farinha': 'Farinha de trigo',
        ':agua': 'Água',
        ':sal': 'Sal',
        ':fermento': 'de Fermento biológico'
    }


def parse_ingredients(args):
    items = [i[2:] for i in args[1].splitlines()]
    return args[0], [item.parseString(i)[0] for i in items], args[2]


def parse_keywords(args):
    kw_index = args[0]
    doc = args[1]
    title = doc[kw_index[0].end()+1:kw_index[1].start()-1]
    ingredients = doc[kw_index[1].end():kw_index[2].start()-1]
    description = doc[kw_index[2].end()+1:]
    return title, ingredients, description


def find_keywords(doc):
    return list(re.finditer('::[^ -]+', doc)), doc


def parse_keyword(ing_dict, kw):
    return 'de ' + ing_dict.get(kw[0])


def make_dict(args):
    return {
        'title': args[0],
        'ingredients': args[1],
        'description': args[2]
    }


def parse_recipe(recipe):
    return pipe(doc, find_keywords, parse_keywords,
                parse_ingredients, make_dict)


measure = Word('.'+ nums)
unity = oneOf('mg g ml l')
quant = Combine(measure + ' ' + unity)
ingredient = Word(':_' + alphas)
ingredient.setParseAction(partial(parse_keyword, get_ing_dict()))
item = Combine(quant + ' ' + ingredient)


if __name__ == '__main__':
    with open(sys.argv[1]) as f:
        doc = f.read()

    result = parse_recipe(doc)
    print(result)
