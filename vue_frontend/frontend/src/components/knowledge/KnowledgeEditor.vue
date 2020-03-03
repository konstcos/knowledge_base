<template>
    <div>
        <h2 class="mb-4">Редактор </h2>

        <div>
            <v-card>
                <!--                <v-card-title-->
                <!--                        class="headline"-->
                <!--                        primary-title>-->
                <!--                    <span v-if="id > 0">Редактирование категории</span>-->
                <!--                    <span v-else>Создание категории</span>-->
                <!--                </v-card-title>-->

                <v-card-text>

                    <div class="mb-5">

                        <div v-if="categoryId === 0">
                            Категория не выбранна
                        </div>
                        <div v-else>
                            Категория: <b>{{ categoryName }}</b>
                        </div>

                    </div>

                    <div>
                        <v-textarea
                                v-model="shortDescription"
                                label="Короткое описание"
                                rows="2"
                        ></v-textarea>
                    </div>

                    <div>
                        <!--                        <v-textarea-->
                        <!--                                v-model="knowledgeText"-->
                        <!--                                label="Содержание"-->
                        <!--                                rows="12"-->
                        <!--                        ></v-textarea>-->

                        <!--                        <vue-markdown>i am a _tast_ ~~tast~~ **test**.</vue-markdown>-->
<!--                        <vue-markdown v-html="knowledgeText"></vue-markdown>-->

                        <v-row>
                            <v-col>
                                <v-textarea
                                        v-model="knowledgeText"
                                        label="Содержание"
                                        rows="12"
                                ></v-textarea>
                            </v-col>

                            <v-col>
                                <div class="markdown_content">
                                    <vue-markdown :source="knowledgeText"></vue-markdown>
                                </div>
                            </v-col>
                        </v-row>

                    </div>

                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            href="#/"
                            text>
                        Отмена
                    </v-btn>
                    <v-btn
                            @click="saveKnowledgeDetail()"
                            color="primary"
                            text>
                        Сохранить и продолжить
                    </v-btn>
                    <v-btn
                            @click="saveKnowledgeDetail('detail')"
                            color="primary"
                            text>
                        Сохранить и перейти в подробности
                    </v-btn>
                </v-card-actions>
            </v-card>

        </div>

        <v-snackbar
                left
                :color="snackbar.color"
                v-model="snackbar.state"
        >
            {{ snackbar.text }}
            <v-btn
                    text
                    dark
                    @click="snackbar.state = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>

    import VueMarkdown from 'vue-markdown'

    export default {
        name: "KnowledgeEditor",
        components: {
            VueMarkdown
        },
        data() {
            return {
                loading: false,
                knowledgeId: 0,
                shortDescription: '',
                knowledgeText: '',
                categoryId: 0,
                categoryName: '',
                snackbar: {
                    state: false,
                    text: '',
                    color: 'error',
                }
            };
        },
        methods: {

            getKnowledgeDetail() {

                if (this.knowledgeId === 0) {
                    this.shortDescription = '';
                    this.knowledgeText = '';
                    this.categoryId = 0;
                    this.categoryName = '';

                    let categoryId = this.knowledgeId;

                    if (this.categoryId !== categoryId) {
                        this.$router.push({
                            query: Object.assign(
                                {},
                                this.$route.query,
                                {}
                            )
                        });
                    }

                    return false;
                }

                this.loading = true;

                axios.post(getKnowledgeDetailUrl, {
                    knowledge_id: this.knowledgeId,
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
                            this.shortDescription = data.knowledge.short_desc;
                            this.knowledgeText = data.knowledge.text;
                            this.categoryId = data.knowledge.category.id;
                            this.categoryName = data.knowledge.category.name;

                            let categoryId = Number(this.$route.query.category_id);

                            if (this.categoryId !== categoryId) {
                                this.$router.push({
                                    query: Object.assign(
                                        {},
                                        this.$route.query,
                                        {
                                            category_id: this.categoryId,
                                            category_name: this.categoryName
                                        })
                                });
                            }

                        } else {
                            alert('fail запроса')
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        console.log('запрос с ошибкой');
                        console.log(err);
                    });

            },

            saveKnowledgeDetail(action = null) {

                if (this.categoryId === 0) {
                    alert('не заданна категория');
                    return false;
                }

                this.loading = true;
                this.snackbar.state = false;

                axios.post(saveKnowledgeDetailUrl, {
                    knowledge_id: this.knowledgeId,
                    category_id: this.categoryId,
                    short_description: this.shortDescription,
                    knowledge_text: this.knowledgeText,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrftoken
                    }
                })
                    .then((result) => {
                        let data = result.data;

                        this.loading = false;

                        console.log('сохраненные данные с сервер данные с сервера');
                        console.log(data);

                        if (data.status === 'success') {
                            this.knowledgeId = data.knowledge_id;

                            this.$router.push(
                                {
                                    params: {id: this.knowledgeId},
                                    query: {category_id: this.categoryId, category_name: this.categoryName}
                                }
                            );


                            this.snackbar.text = 'Успешно сохранено';
                            this.snackbar.color = 'success';
                            this.snackbar.state = true;

                            if (action === 'detail') {
                                // this.$router.go('/knowledge/' + this.knowledgeId + '/detail')
                                this.$router.push({ path: `/knowledge/${this.knowledgeId}/detail` });
                            }

                        } else {
                            this.snackbar.text = 'Ошибка при сохранении';
                            this.snackbar.color = 'error';
                            this.snackbar.state = true;
                        }
                    })
                    .catch(err => {
                        this.loading = false;
                        this.snackbar.text = 'Exception при сохранении';
                        this.snackbar.color = 'error';
                        this.snackbar.state = true;

                        console.log('запрос с ошибкой');
                        console.log(err);
                    });

            },
        },
        watch: {
            $route(to, from) {

                this.knowledgeId = to.params.id ? Number(to.params.id) : 0;

                if (to.query.category_id) {
                    this.categoryId = Number(to.query.category_id);
                    this.categoryName = String(to.query.category_name);
                } else {
                    this.categoryId = 0;
                    this.categoryName = '';
                }
            },

            knowledgeId(newVal, oldVal) {
                this.getKnowledgeDetail();
            }

        },
        mounted() {
            // let knowledgeRouteId = this.$route.query.id;
            let knowledgeRouteId = this.$route.params.id;
            this.knowledgeId = knowledgeRouteId ? Number(knowledgeRouteId) : 0;
            this.getKnowledgeDetail();
        }
    }
</script>

<style scoped>

</style>