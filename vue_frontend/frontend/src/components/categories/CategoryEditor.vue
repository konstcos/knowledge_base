<template>
    <div>
        <v-card>
            <v-card-title
                    class="headline"
                    primary-title>
                <span v-if="id > 0">Редактирование категории</span>
                <span v-else>Создание категории</span>
            </v-card-title>

            <v-card-text>

                <div>
                    <v-text-field
                            v-model="name"
                            flat
                            dark
                            label="Название категории"/>
                </div>

                <div>
                    <v-textarea
                            v-model="description"
                            label="Описание"
                            rows="3"
                    ></v-textarea>
                </div>

                <div>
                    <v-textarea
                            v-model="comment"
                            label="Комментарий"
                            rows="3"
                    ></v-textarea>
                </div>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        @click="cancelEdition"
                        text>
                    Отмена
                </v-btn>
                <v-btn
                        @click="saveCategory()"
                        color="primary"
                        text>
                    Сохранить
                </v-btn>
            </v-card-actions>
        </v-card>

    </div>
</template>

<script>
    export default {
        name: "CategoryEditor",
        data() {
            return {
                id: 0,
                name: '',
                comment: '',
                description: ''
            };
        },
        methods: {

            cancelEdition() {
                this.$emit('cancel-edition');
            },

            saveCategory() {

                axios.post(editCategoryUrl, {
                    id: this.id,
                    name: this.name,
                    comment: this.comment,
                    description: this.description,

                }, {
                    headers: {
                        'X-CSRFToken': csrftoken
                    }
                })
                    .then((result) => {

                        let data = result.data;

                        console.log('запрос с сервера');
                        console.log(data);
                        if (data.status === 'success') {
                            this.$emit('save-edition');
                        } else {
                            alert('fail запроса')
                        }
                    })
                    .catch(err => {
                        console.log('запрос с ошибкой');
                        console.log(err);
                        alert('ошибка запроса категорий')
                    });


            }
        },
        mounted() {
            this.id = this.category_data.id;
            this.name = this.category_data.name;
            this.comment = this.category_data.comment;
            this.description = this.category_data.description;
        },
        props: [
            'category_data'
        ]
    }
</script>

<style scoped>

</style>