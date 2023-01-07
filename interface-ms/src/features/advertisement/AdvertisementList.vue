<template>
    <div>
        <div class="filter-section">
            <div class="filter-section-items">
                <input v-for="filter in filtersConfig" :key="filter.key"
                    :type="filter.type"
                    :placeholder="filter.placeholder"
                    v-model="filters[filter.key]"
                />
            </div>
            <div class="filter-button-section">
                <button class="filter-button" @click.prevent="filter()">Filter</button>
            </div>
            <div class="separator"></div>
        </div>

        <div class="advertisements-container">
            <div v-for="item in advertisements" :key="item.id" class="advertisements-container-item">
                <div class="advertisements-container-item-title">{{item.make + ' ' + item.model}}</div>
                <div class="advertisements-container-item-info">{{item.mileage}} KM</div>

                <div class="separator"></div>

                <div class="advertisements-container-item-group-section">
                    <div>{{item.year}}</div>
                    <div>{{item.price}} €</div>
                </div>
                <div class="advertisements-container-item-group-section">
                    <div>{{item.fuel}}</div>
                    <div>{{item.gear}}</div>
                </div>
                <div class="advertisements-container-item-group-section">
                    <div>{{item.hp}} HP</div>
                    <div>{{item.offerType}}</div>
                </div>

                <div class="separator"></div>

                <div class="advertisements-container-item-info">{{item.phone}}</div>
                <div class="advertisements-container-item-info">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            filters: {
                mileage: null,
                make: null,
                model: null,
                year: null,
                price: null,
                fuel: null,
                gear: null,
                hp: null,
                offerType: null,
                phone: null,
                name: null,
            },
            filtersConfig: [
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
        };
    },

    async mounted() {
        await this.getAllAdvertisements(this.filters);
    },

    methods: {
        async filter() {
            await this.getAllAdvertisements(this.filters);
        },
        ...mapActions('advertisement', ['getAllAdvertisements'])
    },

    computed: {
        ...mapGetters('advertisement', ['advertisements'])
    }

};
</script>

<style lang="scss">
@import '@/assets/variables.scss';

.advertisements-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 90%;
    margin: 20px auto;
    color: #6c6c6c;
    font-size: 14px;
    padding-bottom: 30px;

    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        padding: 15px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        
        &-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        &-info {
            margin-bottom: 10px;
        }

        &-group-section {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            margin-bottom: 10px;

            div {
                text-align: center
            }
        }
    }
}

.separator {
    border-top: 1px solid #e2e2e2;
    width: 100%;
    margin-bottom: 10px;
}

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

.filter-section {
    width: 90%;
    margin: 20px auto;

    &-items {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 20px;
        column-gap: 15px;
    }
}

.filter-button {
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