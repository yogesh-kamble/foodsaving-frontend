class GroupInfoController {
  constructor(SessionUser, $state, $mdDialog, $document, $anchorScroll) {
    "ngInject";
    Object.assign(this, {
      SessionUser,
      $state,
      $mdDialog,
      $document,
      map: {
        markers: {},
        center: {},
        defaults: {
          scrollWheelZoom: false
        }
      }
    });

    $anchorScroll("top");
  }

  $onChanges(changes) {
    if (changes.groupData && changes.groupData.currentValue) {
      this.updateWith(changes.groupData.currentValue);
    }
  }

  hasMarkers() {
    return Object.keys(this.map.markers).length > 0;
  }

  hasLocation(data) {
    return data.latitude && data.longitude && data.address;
  }

  updateWith(data) {
    if (this.hasLocation(data)) {
      this.setMarker(
        data.latitude,
        data.longitude,
        data.address);
    }
  }

  setMarker(lat, lng, message) {
    this.map.markers = {
      pin: {
        lat,
        lng,
        draggable: false,
        message
      }
    };
    this.map.center = {
      lat,
      lng,
      zoom: 16
    };
  }

  isMember() {
    return this.groupData.members.indexOf(this.SessionUser.value.id) >= 0;
  }

  openJoinGroup($event) {
    this.$mdDialog.show({
      parent: this.$document.body,
      targetEvent: $event,
      template: `<join-group selected-group='${this.groupData.id}'></join-group>`
    }).then((groupId) => {
      this.$state.go("group", { groupId });
    });
  }
}

export default GroupInfoController;
