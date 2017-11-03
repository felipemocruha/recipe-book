import neomodel as nm


def create_db_conn(env):
    url = 'bolt://{}:{}@localhost:7687'
    nm.db.set_connection(url.format(env['DB_USER'], env['DB_PASSWORD']))


class Ingredient(nm.StructuredNode):
    name = nm.StringProperty()
    keyword = nm.StringProperty(required=True)

    def to_dict(self):
        return {'keyword': self.keyword, 'name': self.name}


class Requires(nm.StructuredRel):
    quant = nm.FloatProperty()
    unit = nm.StringProperty()


class Recipe(nm.StructuredNode):
    r_id = nm.UniqueIdProperty()
    title = nm.StringProperty()
    description = nm.StringProperty()
    requires = nm.RelationshipTo('Ingredient', 'REQUIRES', model=Requires)

    def to_dict(self):
        return {
            'r_id': self.r_id,
            'title': self.title,
            'description': self.description
        }
