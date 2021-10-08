<template>
  <div class="Accor">
    <div class="Accor-widgets">
      <div class="Widget Accor-widgets-radiusFinder">
        <aside>
          <p>
            I need a list of hotels in a 
            <input v-model="radiusFinder.radius">
            meters radius of these coordinates:
          </p>
          <p>
            Latitude: <input v-model="radiusFinder.coords.lat">
            Longitude: <input v-model="radiusFinder.coords.lon">
          </p>
        </aside>
        
        <div
          v-if="nearbyHotels"
          class="Accor-widgets-radiusFinder-results"
        >
          <Hotel
            v-for="hotel in nearbyHotels"
            :key="hotel.ridCode"
            :data="hotel"
          />
        </div>
      </div>
      
      <div class="Widget Accor-widgets-bestOfferFinder">
        <aside>
          <p>
            I need to find the best hotel standard offer for the
            <input v-model="bestOfferFinder.date">
            in a 
            <input v-model="bestOfferFinder.radius">
            meters radius of these coordinates:
          </p>
          <p>
            Latitude: <input v-model="bestOfferFinder.coords.lat">
            Longitude: <input v-model="bestOfferFinder.coords.lon">
          </p>
        </aside>
        <div
          v-if="bestStandardOfferHotel"
          class="Accor-widgets-bestOfferFinder-results"
        >
          <Hotel
            :data="bestStandardOfferHotel"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { findHotelNearbyWithBestOffer, findHotelsNearby } from './core/helpers/hotels'
import { defineComponent } from 'vue';
import Hotel from './components/Hotel.vue'

export default defineComponent({
  name: 'App',
  components: {
    Hotel,
  },
  data: () => {
    return {
      radiusFinder: {
        coords: {
          lat: 48.85,
          lon: 2.35,
        },
        radius: 2000,
      },
      bestOfferFinder: {
        coords: {
          lat: 48.85,
          lon: 2.35,
        },
        radius: 2000,
        date: '11/01/2021'
      },
    }
  },
  computed: {
    nearbyHotels() {
      const { coords, radius } = this.radiusFinder
      return findHotelsNearby(coords, radius)
    },
    bestStandardOfferHotel() {
      const { coords, radius, date } = this.bestOfferFinder
      const best = findHotelNearbyWithBestOffer(coords, radius, date)
      return best
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.Accor {
  &-widgets {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 1200px;

    .Widget {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      margin-bottom: 50px;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 5px 15px rgba(100,100,100,0.1);

      aside {
        display: flex;
        flex-direction: column;
        border: 1px solid #eee;
        box-sizing: border-box;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 20px;

        p {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
