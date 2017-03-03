class MedicCardCtrl {

  constructor($scope, medicalService) {
    this.scope = $scope;
    // UI settings
      this.openInput = false;
      this.openInfo = false;
      this.info = {
        'left': 0,
        'top': 0,
        'color': "#FFFFFF"
      }
    //-----------
    this.medicalService = medicalService;
    this.medicPoints = []; // medicPoints is an included js-file in index.html
    this.lastClickedPoint = {};
    //user is the selected user atm
    this.selectedUserId = $scope.$root.user._id;

    //arrays to model the info input possibilities
    //$scope.disease = {'tissue': "Muscle", 'pathology': "OverallPain", 'severity': "Moderate"};
    this.infoTissues = [];
    this.infoPathologies = [];
    this.infoseverities = [];

    // catches the event thrown by one of the medicPoints
    var me = this;
    $scope.$on('newMedicPointSelected', function(event, data){
      me.popupTitle = data.point.code + " " + data.arrow;
      me.lastClickedPoint = data;
      (me.openInfo)?me.openInfo=false:me.openInput = true;
    });

    $scope.$on('showMedicPointInfo', function(event,data){
      me.lastClickedPoint = data;
      let statusIndex = me.getStatusIndexFromAtomicName(data.arrow);
      //TODO
      me.openInfo =true;

      let injuries = data.point.status[statusIndex].injury;
      for(let i of injuries){
        i.color = me.medicalService.getColorForSeverity(i.severity);
      }
      me.info.fullInjury = injuries;
      me.info.title = injuries[0].code.replace("-", " ") + " " + me.getMostSevereInjury(injuries);
      // date of earliest injury
      me.info.since = new Date(injuries[0].date);
      me.info.top = data.point.position[0] - 20;
      me.info.left = data.point.position[1] + 50;
      me.info.color = me.medicalService.getColorForSeverity(me.getMostSevereInjury(injuries));
    });

    this.medicalService.getInjuries(this.selectedUserId).then((data)=>
      {
        this.medicPoints = this.resetMedicPoints();
        for(let injury of data){
          this.updateMedicPoint(injury);
        }

      }
    );

  }
  saveMedic(disease){
    var code = this.lastClickedPoint.point.code + "-" +this.lastClickedPoint.arrow;
    let injury = this.convertDiseaseToInjury(disease,code);
    if(injury._id != undefined) {
      this.medicalService.updateInjury(injury).then(
        (result) => {
          if(result.status == 200){
            this.updateMedicPoint(result.data);
            this.scope.disease ={};
            this.cancel();
          }
        });
    }else{
      this.medicalService.addInjury(injury).then((data)=> {
        this.updateMedicPoint(data);
        this.scope.disease ={};
        this.cancel();
      });
    }

  }
  convertDiseaseToInjury(disease, code){
    var injury = {};
    if(disease.id != undefined) injury._id = disease.id;
    injury.code = code;
    injury.tissue = disease.tissue;
    injury.pathology = disease.pathology;
    injury.severity = disease.severity;
    (disease.comment!=undefined)?   injury.comment =  disease.comment :  injury.comment =  "";
    injury.date = disease.date;
    injury.user = this.selectedUserId;
    return injury;
  }
  convertInjuryToDisease(injury){
    var disease = {};
    disease.tissue = injury.tissue;
    disease.pathology = injury.pathology;
    disease.severity = injury.severity;
    disease.comment = injury.comment;
    disease.date = new Date(injury.date);
    disease.id = injury._id;
    return disease;
  }
  cancel(){this.openInput = false;this.scope.disease ={};}
  getStatusIndexFromAtomicName(atomicName){
    switch(atomicName){
      case "Craniaal":
        return 0;
      case "Lateraal":
        return 1;
      case "Centraal":
        return 2;
      case "Mediaal":
        return 3
      case "Caudaal":
        return 4;
      }
      return;
  }
  getMostSevereInjury(injuries){
    var mostSevere = "Licht";
    for(let injury of injuries){
      if(injury.severity > mostSevere) mostSevere = injury.severity;
    }
    return mostSevere;
  }
  updateMedicPoint(injury, deleted = false){
    // reference code is the 'code' value in the medic Point
    var refCode = injury.code.split("-")[0];
    var refArrow = injury.code.split("-")[1];
    for(point of this.medicPoints){
      if(refCode == point.code){
        let statusIndex = this.getStatusIndexFromAtomicName(refArrow);

        // Point's selection is gone when no more injury in DB for this point.
        point.status[statusIndex].selected = !deleted;
        // we only check whether the array size is greater than 1 when we deleted an item. otherwise the selection indication is wrong on when only one injury available.
        if(deleted && point.status[statusIndex].injury.length > 1) {
          point.status[statusIndex].selected =true;
        }

        for(let i = 0; i<point.status[statusIndex].injury.length; i++){
          if(point.status[statusIndex].injury[i]._id == injury._id){
            // if updateMedicPoint is called after delete, splice the injury from the array.
            if(deleted){
              point.status[statusIndex].injury.splice(i,1);
              return;
            }
            // if it was an edit, just replace it.
            point.status[statusIndex].injury[i] = injury;
            return;
          }
        }
        // if no injury was found, this means it's a new injury, add it to the list of this
        point.status[statusIndex].injury.push(injury);
      }
    }
  }
  add(){
    //me.openInfo = false;
    this.openInput = true
  }
  edit(injury){
    this.scope.disease = this.convertInjuryToDisease(injury);
    this.openInput = true;
  }
  delete(injury){
    this.medicalService.deleteInjury(injury).then(
      (result)=>{
        if(result.status == 200)
         this.updateMedicPoint(injury, true);
      }
    )
  }
  resetMedicPoints(){
    return JSON.parse(JSON.stringify(medicPoints));
  }
}

angular.module('common.medic-card').controller('medicCardCtrl', MedicCardCtrl);
