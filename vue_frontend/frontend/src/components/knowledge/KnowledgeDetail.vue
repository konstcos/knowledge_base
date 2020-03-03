<template>
    <div>
        <h2 class="mb-4"> {{ shortDescription }} </h2>

        <div>
            <v-card>

                <v-card-text>

                    <div class="mb-5">

                        <div>
                            Категория: <b>{{ categoryName }}</b>
                        </div>
                    </div>

                    <div>

                        <v-row>
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

<!--                    <v-btn-->
<!--                            @click="pressed()"-->
<!--                            text>-->
<!--                        Тест-->
<!--                    </v-btn>-->

                    <v-btn
                            :href="'#/knowledge/' + knowledgeId + '/editor'"
                            color="primary"
                            text>
                        Редактировать
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
    import testMix from '../mixins'

    export default {
        name: "KnowledgeEditor",
        components: {
            VueMarkdown
        },
        data() {
            return {
                loading: false,
                // knowledgeId: 0,
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

                    // if (this.categoryId !== categoryId) {
                    //     this.$router.push({
                    //         query: Object.assign(
                    //             {},
                    //             this.$route.query,
                    //             {}
                    //         )
                    //     });
                    // }

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

                            // let categoryId = Number(this.$route.query.category_id);

                            // if (this.categoryId !== categoryId) {
                            //     this.$router.push({
                            //         query: Object.assign(
                            //             {},
                            //             this.$route.query,
                            //             {
                            //                 category_id: this.categoryId,
                            //                 category_name: this.categoryName
                            //             })
                            //     });
                            // }

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

        },
        watch: {

            knowledgeId(newVal, oldVal) {
                this.getKnowledgeDetail();
            }

        },
        mounted() {
            // let knowledgeRouteId = this.$route.query.id;
            // let knowledgeRouteId = this.$route.params.id;
            // this.knowledgeId = knowledgeRouteId ? Number(knowledgeRouteId) : 0;
            this.getKnowledgeDetail();
        },
        mixins: [testMix],
        props: [
            'knowledgeId'
        ]
    }
</script>

<style scoped>

</style>