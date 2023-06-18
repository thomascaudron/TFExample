import {pi} from 'mathjs';

const _version = "1.0.0";

function calculateDiameter(client, data) {
    if(data.event == 'hset'){
        var radius = client.call('HGET', data.key, 'radius');
        if(radius){
            redis.log('The radius for ' + data.key + ' is ' + radius + '.');
            var diameter = radius * 2;
            var area = pi * radius * radius;

            client.call('HSET', data.key, 'diameter', diameter+'');
            client.call('HSET', data.key, 'area', area+'');
        }
    }else{
        redis.log('Not HSET event. But ' + data.event + ' event.');
    }
};

redis.registerFunction('getVersion', ()=> { return _version;});
redis.registerKeySpaceTrigger('addDiameter', 'cirkels:', calculateDiameter);