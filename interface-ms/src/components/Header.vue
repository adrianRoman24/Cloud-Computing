<template>
    <div class="header flex spaced al-center">
        <div class="flex">
            <router-link
                v-for="item in menu"
                :key="item.id"
                :to="item.url"
                :class="{
                    'header-link-selected': $route.path.includes(item.url),
                }"
                class="header-link"
            >
                {{ item.name }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    id: 1,
                    name: 'Create',
                    url: '/advertisement/create',
                },
                {
                    id: 2,
                    name: 'View',
                    url: '/advertisement',
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
.header {
    padding: 20px 30px;
    background: $color-primary;

    &-link {
        display: flex;
        position: relative;
        color: white;
        text-decoration: none;
        margin-right: 20px;
        padding-bottom: 3px;
        height: 20px;

        &-selected.header-link:after {
            width: 100%;
        }
    }

    &-link:after {
        background: none repeat scroll 0 0 transparent;
        bottom: 0;
        content: '';
        display: block;
        height: 1px;
        left: 0;
        position: absolute;
        background: #fff;
        transition: width 0.3s ease 0s, left 0.3s ease 0s;
        width: 0;
    }

    &-link:hover:after {
        width: 100%;
        left: 0;
    }

    &-action {
        padding: 10px 20px;
        border-radius: 5px;
        color: white;

        &-login {
            color: $color-primary;
            background: white;
        }

        &-logout {
            background: $color-secondary;
            color: white;
        }
    }
}
</style>
