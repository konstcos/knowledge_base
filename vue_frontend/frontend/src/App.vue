<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>

                <v-list-item link href="/">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Главная страница</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link href="#/">
                    <v-list-item-action>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link href="#/knowledge/editor">
                    <v-list-item-action>
                        <v-icon>mdi-settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer
                v-model="drawerRight"
                app
                clipped
                right>

            <v-container
                    class=""
                    fluid>
                <v-row>
                    <v-col>

                        <Categories></Categories>
                    </v-col>
                </v-row>
            </v-container>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
                clipped-right
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <span class="title ml-3 mr-5">База знаний</span>

            <v-spacer/>

            <v-text-field
                    v-model="search"
                    class="ml-5"
                    solo-inverted
                    flat
                    dark
                    clearable
                    hide-details
                    label="Поиск"/>

            <v-btn small rounded class="ml-5 mr-3" outlined fab dark href="#/knowledge/0/editor">
                <v-icon>mdi-plus</v-icon>
            </v-btn>

            <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"/>
        </v-app-bar>

        <v-content>
            <v-container
                    class=""
                    fluid
            >

                <v-row
                >
                    <v-col>

                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>

        <!--        <v-footer app>-->
        <!--            <span>&copy; 2019</span>-->
        <!--        </v-footer>-->
    </v-app>
</template>


<script>
    import Categories from "./components/Categories";

    export default {
        name: 'App',
        components: {
            Categories,
        },
        data() {
            return {
                drawer: null,
                drawerRight: null,
                search: '',
            };
        },
        methods: {},
        props: {
            source: String,
        },
        watch: {
            search(newVal, oldVal) {

                console.log(newVal);

                if (newVal === '') {
                    return;
                }

                this.search = newVal.trim();
            }
        },
        created() {
            this.$vuetify.theme.dark = true
        },
    };
</script>

<style scoped lang="scss">

</style>