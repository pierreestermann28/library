import graphene
import graphql_jwt
from graphene_django import DjangoObjectType
from .models import Books, Author
from graphql_jwt.decorators import login_required
import re

regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author


class BooksType(DjangoObjectType):
    class Meta:
        model = Books


class AuthorInput(graphene.InputObjectType):
    id = graphene.Int()


class DeleteAuthor(graphene.Mutation):
    ok = graphene.Boolean()
    author = graphene.Field(AuthorType)

    class Arguments:
        id = graphene.Int()

    def mutate(self, info, id):
        ok = True
        author_instance = Author.objects.get(id=id)
        author_instance.delete()
        return DeleteAuthor(ok=ok)


class CreateAuthor(graphene.Mutation):
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    ok = graphene.Boolean()
    author = graphene.Field(AuthorType)

    def mutate(self, info, first_name, last_name, email):
        ok = False
        if(re.search(regex, email)):
            ok = True
            author_instance = Author(first_name=first_name,
                                     last_name=last_name,
                                     email=email)
            author_instance.save()
            return CreateAuthor(ok=ok, author=author_instance)
        return CreateAuthor(ok=ok, author=None)


class UpdateAuthor(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()

    ok = graphene.Boolean()
    author = graphene.Field(AuthorType)

    def mutate(self, info, id, **args):
        ok = False
        author_instance = Author.objects.get(pk=id)
        if author_instance:
            ok = True
            if 'last_name' in args.keys():
                author_instance.last_name = args['last_name']
            if 'first_name' in args.keys():
                author_instance.first_name = args['first_name']
            if 'email' in args.keys():
                author_instance.email = args['email']
            author_instance.save()
            return UpdateAuthor(ok=ok, author=author_instance)
        return UpdateAuthor(ok=ok, author=None)


class CreateBook(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        description = graphene.String()
        author_id = graphene.Int()

    ok = graphene.Boolean()
    book = graphene.Field(BooksType)

    def mutate(self, info, title, description, author_id):
        ok = True
        book_instance = Books(
            title=title,
            description=description,
            author_id=author_id
        )
        book_instance.save()

        return CreateBook(ok=ok, book=book_instance)


class UpdateBooks(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        title = graphene.String()
        description = graphene.String()
        author_id = graphene.Int()

    ok = graphene.Boolean()
    book = graphene.Field(BooksType)

    def mutate(self, info, id, title, description, author_id):
        ok = False
        book_instance = Books.objects.get(pk=id)
        if book_instance:
            ok = True
            author = []

            book_instance.title = title
            book_instance.description = description
            book_instance.author_id = author_id
            book_instance.save()
            return UpdateBooks(ok=ok, book=book_instance)
        return UpdateBooks(ok=ok, book=None)


class Query(graphene.ObjectType):
    books = graphene.List(BooksType)
    authors = graphene.List(AuthorType)
    book = graphene.Field(BooksType, id=graphene.Int())
    author = graphene.Field(AuthorType, id=graphene.Int())

    def resolve_books(self, info, **kwargs):
        return Books.objects.all()

    @login_required
    def resolve_authors(self, info, **kwargs):
        return Author.objects.all()

    def resolve_book(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Books.objects.get(pk=id)

        return None

    def resolve_author(self, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Author.objects.get(pk=id)

        return None


class Mutation(graphene.ObjectType):
    create_author = CreateAuthor.Field()
    update_book = UpdateBooks.Field()
    create_book = CreateBook.Field()
    update_author = UpdateAuthor.Field()
    delete_author = DeleteAuthor.Field()
