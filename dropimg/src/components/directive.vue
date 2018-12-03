<template>
    <div>
        <input type="text" v-focus>
    </div>
</template>
<script>
    export default {
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        }
    }
</script>
<style>
    
</style>
