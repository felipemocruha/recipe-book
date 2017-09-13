from models import Ingredient, Recipe


def get_recipes(graph, recipe_model=Recipe):
    return [recipe.to_dict() for recipe in recipe_model.select(graph)]


def get_recipe(graph, r_id, recipe_model=Recipe):
    return recipe_model.select(graph).where(r_id=r_id).first()
