from django.test import TestCase
from graphene_django.utils.testing import GraphQLTestCase
from ebooks.models import Author
from backend import schema
import json

class AuthorModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Author.objects.create(first_name='Big', last_name='Bob', email = 'Bigbob@hotmail.fr')

    """Test des champs label"""
    def test_first_name_label(self):
        author = Author.objects.get(id=1)
        field_label = author._meta.get_field('first_name').verbose_name
        self.assertEquals(field_label, 'first name')

    def test_email_label(self):
        author=Author.objects.get(id=1)
        field_label = author._meta.get_field('email').verbose_name
        self.assertEquals(field_label, 'email')
    
    def test_last_name_label(self):
        author=Author.objects.get(id=1)
        field_label = author._meta.get_field('last_name').verbose_name
        self.assertEquals(field_label, 'last name')


    """Test la longeur max"""
    def test_first_name_max_length(self):
        author = Author.objects.get(id=1)
        max_length = author._meta.get_field('first_name').max_length
        self.assertEquals(max_length, 30)

    def test_last_name_max_length(self):
        author = Author.objects.get(id=1)
        max_length = author._meta.get_field('last_name').max_length
        self.assertEquals(max_length, 30)

    def test_email_max_length(self):
        author = Author.objects.get(id=1)
        max_length = author._meta.get_field('email').max_length
        self.assertEquals(max_length, 30)


class AuthorSchemaTestCase(GraphQLTestCase):
    # Here you need to inject your test case's schema
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Author.objects.create(first_name='Big', last_name='Bob', email = 'Bigbob@hotmail.fr')
    
    GRAPHQL_SCHEMA = schema

    def test_author_query(self):
        response = self.query(
            '''
            query {
                authors {
                    id
                    firstName
                    lastName
                    email
                }
            }
            ''',
            op_name='authors'
        )

        content = json.loads(response.content)

        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
