<template>
  <div class="books">
    <div class="button">
      <a-button type="primary" @click="addBook">
        + Add book
      </a-button>
    </div>
    <a-table :columns="columns" :data-source="rows" v-if="rows"
             :customRow="customRow"
             :row-selection="{type:'radio', selectedRowKeys : selectedRowKeys}"
    >
      <span slot="name">Book name</span>
      <span slot="author">Author</span>
      <span slot="action" slot-scope="element">
        <a @click="deleteBook(element)">Delete</a>
        <span style="margin: 0 4px">|</span>
        <a @click="editBook(element)">Edit</a>
      </span>
    </a-table>
    <a-empty v-else />
    <book-form
      ref="bookForm"
      :visible="visible"
      :bookSelected="bookSelected"
      @cancel="toggleModal"
      @loadBooks="loadBooks"
    />

  </div>
</template>

<script>
  import BookForm from '../components/BookForm'

  import {mapActions, mapGetters} from "vuex";

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      slots: { title: 'name' },
    },
    {
      dataIndex: 'author',
      key: 'author',
      sorter: true,
      slots: { title: 'author' }
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];


  export default {
        name: "BookList",
        components: { BookForm},
        data() {
          return {
            rows : [],
            columns,
            visible: false,
            selectedRowKeys: [],
            bookSelected: {}
          };
        },
        computed: {
            ...mapGetters('books', {
                findBooksInStore: 'find'
            }),

        },
        methods: {
          ...mapActions('books', {
            findBooks: 'find',
            removeBook: 'remove'
          }),
          customRow(record) {
            return {
              on: {
                click: () => {
                  this.selectedRowKeys = []
                  this.selectedRowKeys.push(record.id)
                }
              }
            };
          },
          loadBooks() {
            this.findBooks({ query: {} }).then((response) => this.rows = response.data);
          },
          toggleModal() {
            this.visible = !this.visible;
          },
          deleteBook(element) {
            this.removeBook(element.id)
                    .then(() => {
                      this.selectedRowKeys = [];
                      this.loadBooks()
                    }).catch(() => alert("Error on book deletion!"))
          },
          addBook() {
            this.bookSelected = null;
            this.toggleModal();
          },
          editBook(element) {
            this.bookSelected = element;
            this.toggleModal();
          }
        },
        created () {
          this.loadBooks();
        },

  }
</script>

<style>
  .button {
    text-align: left;
    margin: 1rem;
  }
  .ant-pagination {
    display: none;
  }

  .comments {
    width: 50%;
    margin: 0 auto;
    text-align: left;
  }
</style>

