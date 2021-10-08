<template>
  <div class="Hotel">
    <img
      class="Hotel-picture"
      src="../assets/hotel.jpg"
    >
    <div class="Hotel-info">
      <strong class="Hotel-info-name">
        {{ data.commercialName }}
        <span class="Hotel-info-rating">
          <img
            v-for="i in parseInt(data.localRating)"
            :key="i"
            class="Hotel-info-rating-star"
            src="../assets/rating-star.svg"
          >
        </span>
      </strong>
      <small>Hôtels - {{ distanceInKM }} de votre recherche</small>

      <div class="Hotel-info-social">
        <img src="../assets/tripadvisor.png">
        ({{ Math.floor(Math.random()* 1000) }}) avis 
      </div>

      <div class="Hotel-info-traits">
        <img src="../assets/parking.svg">
        <img src="../assets/wifi.svg">
        <img src="../assets/restaurant.svg">
        <img src="../assets/air-conditioning.svg">
        <img src="../assets/beverage.svg">
      </div>

      <div class="Hotel-info-price">
        <em>Tarif à partir de (1)</em>
        <p>Pour 1 nuit | 1 adulte</p>
        <p class="prices">
          <span class="public">Public <strong>{{ standardPrice.price }}€</strong></span>
          <span class="member">| Membre <strong>{{ specialPrice.price }}€</strong></span>
        </p>
      </div>

      <div class="Hotel-info-actions">
        <a href="link">Voir le calendrier des prix</a>
        <button>Sélectionner une chambre</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { convertMetersInKilometers } from '../core/helpers/distance'
import { HotelsService } from '../core/services'

import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'HotelComponent',
  props: {
    data: {
        type: Object,
        default: () => {}
    }
  },
  computed: {
      distanceInKM() {
          return `${convertMetersInKilometers(this.data.distance)}km`
      },
      standardPrice() {
          return HotelsService.getHotelFirstStandardOffer(this.data.ridCode)
      },
      specialPrice() {
          return HotelsService.getHotelFirstSpecialOffer(this.data.ridCode)
      }
  }
});
</script>

<style lang="scss">
.Hotel {
    display: flex;
    margin-bottom: 40px;
    width: 100%;

    & > img {
        display: block;
        overflow: hidden;
        border-radius: 10px;
        width: 40%;
        object-fit: cover;
        
    }

    &-info {
        width: 60%;
        margin-left: 20px;
        text-align: left;

        &-name {
            display: block;
            font-size: 18px;
            color: navy;

            .Hotel-info-rating {
                position: relative;
                top: -5px;
                img {
                    margin-right: 2px;
                    width: 8px;
                }
            }
        }

        small {
            display: block;
            margin-bottom: 5px;
            font-size: 11px;
        }

        &-social {
            margin-bottom: 5px;
            font-size: 12px;
        }

        &-traits {
            margin-bottom: 10px;

            img {
                margin-right: 5px;
                width: 20px;
            }
        }

        &-price {
            text-align: right;
            position: relative;
            padding: 20px;
            box-sizing: border-box;
            border-radius: 10px;
            background: #eee;
            font-size: 12px;

            em {
                position: absolute;
                right: 20px;
                top: -10px;
                display: inline-block;
                font-style: normal;
                background: white;
                border-radius: 20px;
                text-transform: uppercase;
                font-weight: bold;
                padding: 5px 15px;
            }

            .prices {
                font-size: 14px;

                .member {
                    margin-left: 5px;
                    color: darkblue;

                    strong {
                        font-size: 18px;
                    }
                    
                }
            }
        }

        &-actions {
            margin-top: 10px;
            align-items: center;
            display: flex;
            justify-content: space-between;
            
            a {
                font-size: 12px;
            }

            button {
                cursor: pointer;
                border: none;
                border-radius: 20px;
                padding: 10px 20px;
                font-weight: bold;
                background: teal;
                color: white;
            }
        }
    }
}
</style>
