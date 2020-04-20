import graphene
import users.schema
import ebooks.schema

class Query(users.schema.Query, ebooks.schema.Query, graphene.ObjectType):
    pass

class Mutation(users.schema.Mutation, ebooks.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

