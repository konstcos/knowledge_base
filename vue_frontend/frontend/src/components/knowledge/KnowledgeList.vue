<template>
    <div>

        <div v-if="loading">
            загрузка
        </div>

        <div v-else>

            <div v-if="selectedCategory > 0" class="mb-3">
                категория: {{ selectedCategoryName }}
                <span class="clear_selected_category"
                      @click="emptyCategory()">x</span>
            </div>


            <div v-if="knowledge.length > 0">
                <div v-for="knowing in knowledge" class="mb-5">

                    <v-card>
                        <v-card-title
                                class="headline"
                                primary-title>
                            <v-row>
                                <v-col cols="8">
                                    <a :href="'#/knowledge/' + knowing.id + '/detail'">{{ knowing.short_desc }}</a>
                                </v-col>
                                <v-col cols="4" class="text-right">
                                    <v-btn
                                            @click="openKnowledgeDetailDialog(knowing.id, knowing.short_desc)"
                                            small
                                            outlined
                                            fab
                                            rounded
                                            dark
                                            class="ml-3">
                                        <v-icon small>mdi-card-text-outline</v-icon>
                                    </v-btn>

                                    <v-btn
                                            small
                                            outlined
                                            fab
                                            rounded
                                            dark
                                            class="ml-3"
                                            :href="'#/knowledge/' + knowing.id + '/editor'">
                                        <v-icon small>mdi-pencil</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>


                        </v-card-title>

                        <v-card-text>


                            <div class="mb-3">категория: <b>{{ knowing.category.name }}</b></div>

                            <!--                            <vue-markdown :source="knowing.text.slice(0, 150)"></vue-markdown>-->
                            <div class="knowing_content">
                                <div class="markdown_content">
                                    <vue-markdown :source="knowing.text"></vue-markdown>
                                </div>
                            </div>

                            <div v-if="knowing.tags.length > 0" class="mt-4">
                                <v-chip
                                        v-for="tag in knowing.tags"
                                        :key="tag.id"
                                        class="ma-2"
                                        dark
                                >
                                    {{ tag.name }}
                                </v-chip>
                            </div>
                            <div v-else class="mt-4">
                                тэгов нет
                            </div>
                        </v-card-text>

                        <!--            <v-divider></v-divider>-->

                        <!--            <v-card-actions>-->
                        <!--                <v-spacer></v-spacer>-->
                        <!--                <v-btn-->
                        <!--                        @click="cancelEdition"-->
                        <!--                        text>-->
                        <!--                    Отмена-->
                        <!--                </v-btn>-->
                        <!--                <v-btn-->
                        <!--                        @click="saveCategory()"-->
                        <!--                        color="primary"-->
                        <!--                        text>-->
                        <!--                    Сохранить-->
                        <!--                </v-btn>-->
                        <!--            </v-card-actions>-->
                    </v-card>

                </div>
            </div>
            <div v-else>
                нет материала по запросу
            </div>

        </div>

        <div v-if="num_pages > 1" class="text-center">
            <v-pagination
                    v-model="page"
                    :length="num_pages"
            ></v-pagination>
        </div>


        <v-dialog v-model="knowledgeDetailDialog" width="80%" scrollable>
            <v-card>
                <v-card-title class="headline"
                              primary-title>
                    {{ currentDetailName }}
                </v-card-title>
                <v-card-text>
                    <knowledge-detail :knowledgeId="currentDetailId"></knowledge-detail>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>

</template>

<script>

    import VueMarkdown from 'vue-markdown';
    import KnowledgeDetail from "./KnowledgeDetail";

    export default {
        name: "KnowledgeList",
        components: {
            VueMarkdown,
            KnowledgeDetail
        },

        data() {
            return {
                loading: true,
                page: 1,
                num_pages: 1,
                knowledge: [],
                selectedCategory: 0,
                selectedCategoryName: '',
                knowledgeDetailDialog: false,
                currentDetailId: 0,
                currentDetailName: '',
            };
        },
        methods: {

            getKnowledgeList() {

                this.loading = true;

                axios.post(getKnowledgeAllUrl, {
                    page: this.page,
                    category: this.selectedCategory,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                })
                    .then((result) => {
                        let data = result.data;

                        this.loading = false;

                        if (data.status === 'success') {
                            this.knowledge = data.knowledge;
                            this.num_pages = data.num_pages;
                        } else {
                            alert('fail запроса')
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        console.log('запрос с ошибкой');
                        console.log(err);
                        alert('ошибка запроса категорий')
                    });

            },

            emptyCategory() {
                this.$router.push({query: {}});
                // this.selectedCategory = 0;
                // this.selectedCategoryName = '';
            },

            openKnowledgeDetailDialog(knowingId, knowingName) {
                this.currentDetailId = knowingId;
                this.currentDetailName = knowingName;
                this.knowledgeDetailDialog = true
            }

        },
        watch: {
            page(newVal, oldVal) {
                this.getKnowledgeList();
            },
            $route(to, from) {

                console.log(to);

                if (to.query.category_id) {
                    this.selectedCategory = Number(to.query.category_id);
                    this.selectedCategoryName = to.query.category_name;
                } else {
                    this.selectedCategory = 0;
                    this.selectedCategoryName = '';
                }

                if (this.page === 1) {
                    this.getKnowledgeList();
                } else {
                    this.page = 1;
                }
            }
        },
        props: [
            // 'category'
        ],
        mounted() {

            let categoryId = Number(this.$route.query.category_id);
            let categoryName = this.$route.query.category_name;
            if (categoryId && categoryName) {
                this.selectedCategory = categoryId;
                this.selectedCategoryName = categoryName;
            } else {
                this.$router.push({query: {}});
            }

            this.getKnowledgeList();
        }
    }
</script>

<style scoped lang="scss">

    .clear_selected_category {
        font-size: 11px;
        color: #f45c5c;
        cursor: pointer;
    }

    .knowing_content {
        max-height: 150px;
        overflow: hidden;
    }
</style>