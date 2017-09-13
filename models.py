from py2neo.ogm import GraphObject, Property, RelatedTo, RelatedFrom
from uuid import uuid4


class Ingredient(GraphObject):
    __primarykey__ = 'hash_name'

    hash_name = Property()
    long_name = Property()
    used_in = RelatedFrom('Recipe', 'NEEDS')

    def __init__(self, hash_name, long_name):
        self.hash_name = hash_name
        self.long_name = long_name

    def to_dict():
        return {
            'hash_name': self.hash_name,
            'long_name': self.long_name
        }


class Recipe(GraphObject):
    __primarykey__ = 'r_id'

    r_id = Property()
    title = Property()
    description = Property()
    ingredients = RelatedTo('Ingredient', 'NEEDS')

    def __init__(self, title, description, ingredients):
        self.r_id = uuid4.hex()
        self.title = title
        self.description = description
        self.ingredients = ingredients

    def to_dict():
        return {
            'r_id': self.r_id,
            'title': self.title,
            'description': self.description
        }
