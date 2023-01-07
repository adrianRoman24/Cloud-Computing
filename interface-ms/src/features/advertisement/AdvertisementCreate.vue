<template>
  <div class="flex column center al-center form-container">
        <form action="" class="flex column center al-center">
            <p class="form-title">Create advertisement</p>

            <div v-for="item in formConfig" :key="item.key">
                <input :type="item.type" :placeholder="item.placeholder" v-model.lazy="form[item.key]" @blur="$v.form[item.key].$touch()">
                <div v-if="$v.form[item.key].$error && isFormSubmitted">
                    <p v-if="!$v.form[item.key].required" class="form-error">
                        This field is required!
                    </p>
                </div>
            </div>
            <div class="form-button">
                <button @click.prevent="submit()">Save</button>
            </div>
        </form>
        <div v-if="message">
            {{message}}
        </div>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators'
import { mapActions , mapGetters } from 'vuex'
export default {
    data() {
        return {
            form: this.initForm(),
            isFormSubmitted: false,
            formConfig: this.initFormConfig()
        }
    },

    methods: {
        async submit() {
            this.$v.form.$touch();
            
            if (this.$v.form.$invalid) {
                this.isFormSubmitted = true
                return;
            }

            await this.createAdvertisement(this.form)

            // reset form
            this.form = this.initForm();
            this.isFormSubmitted = false
            setTimeout(()=>{
                this.setMessage(null);
            }, 4000);

        },
        initForm() {
            return {
                mileage: '',
                make: '',
                model: '',
                year: '',
                price: '',
                fuel: '',
                gear: '',
                hp: '',
                offerType: '',
                phone: '',
                name: '',
            }
        },
        initFormConfig() {
            return [
                {
                    placeholder: 'Mileage',
                    type: 'number',
                    key: 'mileage'
                },
                {
                    placeholder: 'Manufacturer',
                    type: 'text',
                    key: 'make'
                },
                {
                    placeholder: 'Model',
                    type: 'text',
                    key: 'model'
                },
                {
                    placeholder: 'Year',
                    type: 'number',
                    key: 'year'
                },
                {
                    placeholder: 'Price',
                    type: 'number',
                    key: 'price'
                },
                {
                    placeholder: 'Fuel type',
                    type: 'text',
                    key: 'fuel'
                },
                {
                    placeholder: 'Gear type',
                    type: 'text',
                    key: 'gear'
                },
                {
                    placeholder: 'Power(HP)',
                    type: 'number',
                    key: 'hp'
                },
                {
                    placeholder: 'Car usage',
                    type: 'text',
                    key: 'offerType'
                },
                {
                    placeholder: 'Phone number',
                    type: 'text',
                    key: 'phone'
                },
                {
                    placeholder: 'Owner name',
                    type: 'text',
                    key: 'name'
                },
            ]
        },
        ...mapActions('advertisement', ['createAdvertisement', 'setMessage'])
    },
    computed: {
        ...mapGetters('advertisement', ['message'])
    },
    validations: {
        form: {
            mileage: {
                required
            },
            make: {
                required
            },
            model: {
                required
            },
            year: {
                required
            },
            price: {
                required
            },
            fuel: {
                required
            },
            gear: {
                required
            },
            hp: {
                required
            },
            offerType: {
                required
            },
            phone: {
                required
            },
            name: {
                required
            },          
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/variables.scss';

input {
    padding: 10px;
    font-size: 14px;
    border: none; 
    border-bottom: 1px solid #e2e2e2;
    transition: border 0.3s;

    &:focus {
        outline: 0;
        border-bottom: 1px solid $color-primary;
    }
}

.form-title {
    font-size: 25px;
}

.form-button {
    margin: 20px auto;
    padding: 10px 20px;
    color: white;
    background: $color-primary;
    border: none;
    border-radius: 4px;

    &-section {
        display: flex;
        justify-content: center;
    }
}
</style>