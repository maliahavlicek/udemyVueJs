new Vue({
  el: '#exercise',
  data: {

    effects: ['highlight', 'shrink'],
    effectClass: '',
    enteredClass: '',
    class2: '',
    class3: '',
    myStyle: {
    	width: '100px',
      height: '150px',
      backgroundColor: 'gray'
    },
    percentComplete: 0
  },
  methods: {

    startEffect: function() {
      var vm=this;
      setInterval(function() {
        if(vm.effectClass!='highlight'){
          vm.effectClass=vm.effects[0];
        }
        else{
          vm.effectClass=vm.effects[1];
        }
      }, 750);
    },
    startProgress : function(){
      var vm = this;
      setInterval(function () {
        if(vm.percentComplete<100) {
          vm.percentComplete += 10;
        }
      }, 500)

    }


  },
  computed: {

    lifeLeft: function () {
      return {
        width: this.percentComplete + '%'
      }


    }
  }

});
