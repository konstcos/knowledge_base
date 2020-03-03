import KnowledgeList from "./components/knowledge/KnowledgeList";
import KnowledgeEditor from "./components/knowledge/KnowledgeEditor";
import KnowledgeDetail from "./components/knowledge/KnowledgeDetail";
import KnowledgeDetailPage from "./pages/knowledge/KnowledgeDetailPage";

const routes = [
    {
        path: '/',
        name: 'list',
        component: KnowledgeList,
        meta: {
            title: "list of all spheres",
            breadcrumbs: [{

                name: 'CONTACT',
                text: 'CONTACT',
                href: '/',
                disabled: false,

            },{

                name: 'Spheres',
                text: 'Spheres',
                href: '',
                disabled: false,

            }],
        }
    },

    {
        path: '/knowledge/:id/detail',
        name: 'knowledge.detail',
        component: KnowledgeDetailPage,
        meta: {
            title: "detail of sphere",
            breadcrumbs: [{

                name: 'CONTACT',
                text: 'CONTACT',
                href: '/',
                disabled: false,

            },{

                name: 'Spheres',
                text: 'Spheres',
                href: '#/',
                disabled: false,

            }, {

                name: 'Detail',
                text: 'Detail',
                href: '',
                disabled: true,

            }],
        }
    },

    {
        path: '/knowledge/:id/editor',
        name: 'knowledge.editor',
        component: KnowledgeEditor,
        meta: {
            title: "detail of sphere",
            breadcrumbs: [{

                name: 'CONTACT',
                text: 'CONTACT',
                href: '/',
                disabled: false,

            },{

                name: 'Spheres',
                text: 'Spheres',
                href: '#/',
                disabled: false,

            }, {

                name: 'Detail',
                text: 'Detail',
                href: '',
                disabled: true,

            }],
        }
    }

];

export default routes;