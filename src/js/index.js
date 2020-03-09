require('es6-promise').polyfill();
require('isomorphic-fetch');
require('nodelist-foreach-polyfill');
import Vue from 'vue';
import vuetify from '../plugins/vuetify'
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';
import { compareRecord } from './time/record';
import { contactsInputs } from './contacts/inputs';
import { validateForm } from './contacts/validateForm';
import { mapSalon } from './salon/map';

new Vue({
  el: '#order',
  components: {
    DatePick,
  },
  data: {
    isSalons: false,
    isLoading: true,
    isWorkers: false,
    isTime: false,
    // isContacts: true,
    isContacts: false,
    salonData: [],
    workersData: [],
    timeData: [],
    master: {
      id: '',
      fio: '',
      photo: '',
      desc: '',
      salonId: '',
      time: '',
      date: ''
    },
    steps: {
      step2: false,
      step3: false,
      step4: false,
    },
    date: '',
    calendar: {
      isRecordTime: false,
      weekdays: ['Пн','Вт','Ср','Чт','Пт','Сб', 'Вс'],
      months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
    },
    order: {
      request: true,
      success: false
    },
    client: {
      name: '',
      phone: ''
    }
  },
  created() {
    this.fetchSalons()
    // this.fetchWorkers()
    mapSalon()
  },
  methods: {
    async fetchSalons() {
      try {
        const url = '/data/salon.json';
        await fetch(url).then((response) => {
          const data = response.json().then((json) => {
            this.salonData = json;
          })
          return data;
        })
        this.isLoading = false
        this.isSalons = true
      } catch (error) {
        console.log(error);
      }
    },
    async fetchWorkers() {
      try {
        const url = '/data/workers.json';
        await fetch(url).then((response) => {
          const data = response.json().then((json) => {
            this.workersData = json;
          })
          this.isLoading = false
          this.isWorkers = true
          return data;
        })
      } catch (error) {
        console.log(error);
      }
    },
    async fetchTime() {
      try {
        const url = '/data/gettimetable.json';
        await fetch(url).then((response) => {
          const data = response.json().then((json) => {
            this.timeData = json;
          })
          return data;
        })
      } catch (error) {
        console.log(error);
      }
      this.calendar.isRecordTime = true
      compareRecord()
    },
    showWorkers(event) {
      const thisButton = event.target.closest('button')
      const thisId = thisButton.getAttribute('data-salon-id')

      this.master.salonId = thisId

      this.isSalons = false
      this.isLoading = true
      this.steps.step2 = true
      this.fetchWorkers()
    },
    showTime(event) {
      const thisWorker = event.target.closest('.worker')
      const workerName = thisWorker.querySelector('.worker__name').innerHTML
      const workerDesc = thisWorker.querySelector('.worker__desc').innerHTML
      const workerPic = thisWorker.querySelector('.worker__pic img').getAttribute('src')
      const workerId = thisWorker.getAttribute('data-master-id')

      this.master.id = workerId
      this.master.fio = workerName
      this.master.desc = workerDesc
      this.master.photo = workerPic

      this.isWorkers = false
      this.calendar.isRecordTime = false
      this.isTime = true
      this.steps.step3 = true

      this.$nextTick(function () {
        const calendarInput = document.querySelector('.time__calendar input')

        calendarInput.addEventListener('blur', () => {
          setTimeout(() => {
            if (calendarInput.value.length > 9) {
              this.fetchTime()
              this.calendar.isRecordTime = true
            } else {
              this.calendar.isRecordTime = false
            }
          }, 500);
        })
      })
    },
    showContacts() {
      const activeTime = document.querySelector('.time__record--active input').getAttribute('data-record-time')
      const date = document.querySelector('.time__calendar input').value


      this.isTime = false
      this.isContacts = true
      this.steps.step4 = true
      this.master.time = activeTime
      this.master.date = date

      this.$nextTick(function () {
        contactsInputs()
      })
    },
    filterWorker: function(items) {
      const salonId = this.master.salonId
      
      return items.filter(function(item) {
        return item.idsalon == salonId;
      })
    },
    filterMaster: function(items) {
      const masterId = this.master.id
      
      return items.filter(function(item) {
        return item.id == masterId;
      })
    },
    showStep(number) {
      this.isSalons = false
      this.isWorkers = false
      this.isTime = false
      this.isContacts = false

      if (number == 1) {
        this.isSalons = true
        mapSalon()
      } else if (number == 2) {
        this.isWorkers = true
      } else if (number == 3) {
        this.isTime = true
        // this.calendar.isRecordTime = false
        this.$nextTick(function () {
          compareRecord()
        })
      } else if (number == 4) {
        this.isContacts = true
      }
    },
    isFutureDate(date) {
      const currentDate = new Date();
      return date <= currentDate;
    },
    sendForm(event) {
      if(validateForm(event)) {
        this.order.success = true
        this.order.request = false

        console.log(`id салона - ${this.master.salonId}`)
        console.log(`id сотрудника - ${this.master.id}`)
        console.log(`Имя клиента - ${this.client.name}`)
        console.log(`Телефон клиента - ${this.client.phone}`)
        console.log(`Время записи - ${this.master.date} ${this.master.time}`)
        
      } else {
        console.log('error');
      }
    }
  },
  vuetify,
}).$mount('#app')

