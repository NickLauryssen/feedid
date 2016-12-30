class MedicCardCtrl {

  constructor($scope, medicalService) {
    this.scope = $scope;
    // UI settings
      this.openInput = false;
    //-----------

    this.medicalService = medicalService;
    this.medicPoints = medicPoints; // medicPoints is an included js-file in index.html
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
      me.openInput = true;
    });

  }

  addMedic(disease){
    var code = this.lastClickedPoint.point.code + "-" +this.lastClickedPoint.arrow;
    var injury = {};
    injury.code = code;
    injury.tissue = disease.tissue;
    injury.pathology = disease.pathology;
    injury.severity = disease.severity;
    (disease.comment!=undefined)?   injury.comment =  disease.comment :  injury.comment =  "";
    injury.date = disease.date;
    injury.user = this.selectedUserId;

    this.medicalService.addInjury(injury).then((data)=> {
      this.updateMedicPoint(data);
      this.scope.disease ={};
      this.cancel();
    });
  }
  cancel(){this.openInput = false;this.scope.disease ={};}

  updateMedicPoint(injury){
    // reference code is the 'code' value in the medic Point
    var refCode = injury.code.split("-")[0];
    var refArrow = injury.code.split("-")[1];
    for(point of this.medicPoints){
      if(refCode == point.code){
        point.comment = injury.comment;
        point.data = injury.date;
        point.diagnose = injury.tissue + " " + injury.pathology + " " + injury.severity;
        point.diagnoseCode = injury.code;

        switch(refArrow){
          case "Craniaal":
            point.status[0].selected = true;
            point.status[0].severe = injury.severity;
            break;
          case "Lateraal":
            point.status[1].selected = true;
            point.status[1].severe = injury.severity;
            break;
          case "Centraal":
            point.status[2].selected = true;
            point.status[2].severe = injury.severity;
            break;
          case "Mediaal":
            point.status[3].selected = true;
            point.status[3].severe = injury.severity;
            break;
          case "Caudaal":
            point.status[4].selected = true;
            point.status[4].severe = injury.severity;
            break;
          }

          return;
      }
    }
  }
}

angular.module('common.medic-card').controller('medicCardCtrl', MedicCardCtrl);
