<template>
    <div>
        <div>Категории:</div>
        <br>
        <div v-if="categories.length > 0">
            <ul>
                <li v-for="category in categories">
                    <span
                            @click="selectCategory(category)"
                            class="select_category"
                            :class="{'selected_category': selectedCategory === category.id}">
                        {{ category.name }}
                    </span>
                    <span
                            class="edit_category" @click="editCategory(category)">
                        ред
                    </span>
                </li>
            </ul>

        </div>
        <div v-else>
            нет категорий
        </div>
        <div class="mt-4">
            <v-btn @click="editCategory" small>
                <!--                добавить категорию-->
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>

        <v-dialog
                v-model="categoryEditorDialog"
                width="500">
            <category-editor v-if="categoryEditorDialog"
                             @cancel-edition="cancelCategoryEdition"
                             @save-edition="saveCategoryEdition"
                             :category_data="categoryEditorData">
            </category-editor>
        </v-dialog>

    </div>
</template>

<script>
    import CategoryEditor from "./categories/CategoryEditor";

    export default {
        name: "Categories",
        components: {
            CategoryEditor
        },
        data() {
            return {
                categories: [],
                categoryEditorDialog: false,
                categoryEditorData: {},
                selectedCategory: 0,
            };
        },
        filters: {
            category: function (category) {
                return '- = ' + category;
            }
        },
        computed: {},
        methods: {

            loadCategories() {
                axios.post(categoriesUrl, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                })
                    .then((data) => {
                        console.log(data);
                        if (data.data.status === 'success') {

                            this.categories = data.data.articles;
                        } else {
                            alert('fail запроса')
                        }
                    })
                    .catch(err => {
                        console.log('запрос с ошибкой');
                        console.log(err);
                        alert('ошибка запроса категорий')
                    });
            },

            editCategory(category = false) {

                this.categoryEditorData = {
                    id: category && category.id ? category.id : 0,
                    name: category && category.name ? category.name : '',
                    comment: category && category.comment ? category.comment : '',
                    description: category && category.description ? category.description : '',
                };

                this.categoryEditorDialog = true;
            },

            cancelCategoryEdition() {
                this.categoryEditorData = {
                    id: 0,
                    name: '',
                    comment: '',
                    description: '',
                };
                this.categoryEditorDialog = false;
            },

            saveCategoryEdition() {
                this.categoryEditorData = {
                    id: 0,
                    name: '',
                    comment: '',
                    description: '',
                };
                this.categoryEditorDialog = false;
                this.loadCategories();
            },

            selectCategory(category) {
                let categoryId = Number(this.$route.query.category_id);
                if (categoryId !== category.id) {
                    this.$router.push({
                        query: Object.assign(
                            {},
                            this.$route.query,
                            {
                                category_id: category.id,
                                category_name: category.name
                            })
                    });
                }
            }

        },
        props: [],
        watch: {
            $route(to, from) {

                if (to.query.category_id) {
                    this.selectedCategory = Number(to.query.category_id);
                } else {
                    this.selectedCategory = 0;
                }
            }

        },
        mounted() {
            this.loadCategories();
        }
    }
</script>

<style scoped lang="scss">

    .select_category {
        cursor: pointer;
    }

    .selected_category {
        color: #4360f0;
    }

    .edit_category {
        font-size: 10px;
        cursor: pointer;
        color: grey;
    }

</style>