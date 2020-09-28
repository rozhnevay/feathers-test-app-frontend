<template>
  <div>
    <a-modal
      :visible="visible"
      title='Action'
      okText='OK'
      cancelText='Cancel'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { saveBook() }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='Name'>
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: bookSelected ? bookSelected.name : null,
                rules: [{ required: true, message: 'Please, enter the name of the book' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Author'>
          <a-input
            v-decorator="[
              'author',
              {
                initialValue: bookSelected ? bookSelected.author : null,
                rules: [{ required: true, message: 'Please, enter the author of the book' }],
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "BookForm",
        props: ['visible', 'bookSelected'],
        beforeCreate() {
          this.form = this.$form.createForm(this, { name: 'form_in_modal' });
        },
        methods: {
          ...mapActions('books', {
            createBook: 'create',
            updateBook: 'update'
          }),
          saveBook() {
            const { form } = this
            let promise;
            if (this.bookSelected) {
              promise = this.updateBook([this.bookSelected.id, {name: form.getFieldValue("name"), author: form.getFieldValue("author")}, {}]);
            } else {
              promise = this.createBook({name: form.getFieldValue("name"), author: form.getFieldValue("author")});
            }

            promise.then(() => {
              this.$emit('loadBooks');
              this.$emit('cancel');
              form.resetFields()
            }).catch((err) => {
              console.log(err)
              alert("Error on book creation!")
            })
            ;

          },

        }
    }
</script>

<style scoped>

</style>
