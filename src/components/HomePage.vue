<template>
    <div class="home">
        <span class="H-text">{{Header}}</span>
        <div class="md-layout">
            <div class="md-layout-item"></div>
            <div class="md-layout-item"></div>
            <div class="md-layout-item">
                <h5>Create Account?</h5>
            </div>
            <div class="md-layout-item">
                <md-button class="md-raised" @click="goToRegisterPage">Sign up</md-button>
            </div>
            <div class="md-layout-item"></div>
            <div class="md-layout-item"></div>
        </div>
    </div>
</template>

<script>
    import router from '../router'
    export default {
        name : 'home',
        data() {
            return {
                Header: "Welcome!!"
            }
        },
        methods: {
            goToRegisterPage() {
                router.push({ name:"Register" });
            }
        }
    }
</script>

<style scoped>
    .H-text {
        font-size: 50px;
    }
</style>