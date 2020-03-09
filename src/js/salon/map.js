export function mapSalon() {

  ymaps.ready(init);

  async function init() {
    var myMap = new ymaps.Map('map', {
        center: [59.939095, 30.315868],
        zoom: 10
      }, {
        searchControlProvider: 'yandex#search'
      }),
      objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        // ObjectManager принимает те же опции, что и кластеризатор.
        gridSize: 32
      });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);

    await fetch('data/salon.json')
      .then((response) => response.json())
      .then((data) => {
        objectManager.add(data);
      });
  }
}