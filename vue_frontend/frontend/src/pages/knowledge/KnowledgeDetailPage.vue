<template>
    <div>
        <knowledge-detail :knowledgeId="knowledgeId"></knowledge-detail>
    </div>
</template>

<script>
    import KnowledgeDetail from "../../components/knowledge/KnowledgeDetail";

    export default {
        name: "KnowledgeDetailPage",
        components: {KnowledgeDetail},
        data() {
            return {
                knowledgeId: 0
            };
        },
        mounted() {
            // let knowledgeRouteId = this.$route.query.id;
            let knowledgeRouteId = this.$route.params.id;
            this.knowledgeId = knowledgeRouteId ? Number(knowledgeRouteId) : 0;
            // this.getKnowledgeDetail();
            console.log('страница подробностей по знаниям');
        },

    }
</script>

<style scoped lang="scss">

</style>