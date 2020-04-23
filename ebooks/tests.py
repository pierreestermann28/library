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

    def test_some_query(self):
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


    def test_query_with_variables(self):
        response = self.query(
            '''
            query author($id: Int!){
                author(id: $id) {
                    email
                }
            }
            ''',
            op_name='author',
            variables={'id':1}
        )

        content = json.loads(response.content)
        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
    
    def test_create_author(self):
        response = self.query(
            '''
            mutation createAuthor($email: String!, $firstName: String!,$lastName: String!) {
                createAuthor(email: $email, firstName: $firstName, lastName: $lastName) {
                    author {
                        email
                    }
                }
            }
            ''',
            op_name='createAuthor',
            variables={'firstName': 'foo', 'lastName': 'bar', 'email': 'p.estermann@hotmail.fr'}
        )
        content = json.loads(response.content)
        data = content['data']['createAuthor']['author']
        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response) 
        self.assertEqual(data['email'], 'p.estermann@hotmail.fr')

    def test_create_author_with_wrong_email(self):
        response = self.query(
            '''
            mutation createAuthor($email: String!, $firstName: String!,$lastName: String!) {
                createAuthor(email: $email, firstName: $firstName, lastName: $lastName) {
                    author {
                        email
                    }
                }
            }
            ''',
            op_name='createAuthor',
            variables={'firstName': 'foo', 'lastName': 'bar', 'email': 'pestermannhotmail.fr'}
        )
        content = json.loads(response.content)
        data = content['data']['createAuthor']['author']
        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response) 
        self.assertEqual(data, None)

    
    def test_update_author_with_wrong_email(self):
        response = self.query(
            '''
            mutation updateAuthor($id: Int!, $email: String, $firstName: String,$lastName: String) {
                updateAuthor(id: $id, email: $email, firstName: $firstName, lastName: $lastName) {
                    author {
                        id
                        firstName
                        lastName
                        email
                    }
                }
            }
            ''',
            op_name='updateAuthor',
            variables={'id': 1, 'firstName': 'foo2', 'lastName': 'baraka', 'email': 'barakafoo2@hotmail.fr'}
        )
        new_last_name = 'baraka'
        content = json.loads(response.content)
        indice = content['data']['updateAuthor']['author']['id']
        new_first_name = content['data']['updateAuthor']['author']['firstName']
        new_last_name = content['data']['updateAuthor']['author']['lastName']
        new_email = content['data']['updateAuthor']['author']['email']
        
        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response) 
        self.assertEqual('1', indice)
        self.assertEqual('foo2', new_first_name)
        self.assertEqual('baraka', new_last_name)
        self.assertEqual('barakafoo2@hotmail.fr', new_email)
    
   