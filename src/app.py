from flask import Flask,request, jsonify
from flask_cors import CORS
from config import config
import pandas as pd
import networkx as nx

app = Flask(__name__)

CORS(app)

# 1. Leer los archivos GTFS utilizando Pandas
stops = pd.read_csv(r'C:/Users/carlo/Desktop/PlannerGTFS-V2-F/src/GTFS/stops.txt')
trips = pd.read_csv(r'C:/Users/carlo/Desktop/PlannerGTFS-V2-F/src/GTFS/trips.txt')
stop_times = pd.read_csv(r'C:/Users/carlo/Desktop/PlannerGTFS-V2-F/src/GTFS/stop_times.txt')

unique_stop_ids = {}
G = None

# 2. Crear un diccionario que mapea los nombres de las paradas a una lista de stop_id asociados
stops_dict = {}
for index, row in stops.iterrows():
    if row['stop_name'] not in stops_dict:
        stops_dict[row['stop_name']] = [row['stop_id']]
    else:
        stops_dict[row['stop_name']].append(row['stop_id'])

# 3. Crear un diccionario que mapea cada stop_id a un nuevo identificador único
unique_stop_ids = {}
for name, ids in stops_dict.items():
    for i, stop_id in enumerate(ids):
        unique_stop_id = f"{name}_{i}"  # por ejemplo: "Parada X_0", "Parada X_1"
        unique_stop_ids[stop_id] = unique_stop_id

# 4. Recorrer los archivos GTFS y reemplazar los stop_id por los nuevos identificadores únicos de las paradas
stop_times['stop_id'] = stop_times['stop_id'].map(unique_stop_ids)
stop_times['arrival_time'] = pd.to_datetime(stop_times['arrival_time'], format='%H:%M:%S')
stop_times['departure_time'] = pd.to_datetime(stop_times['departure_time'], format='%H:%M:%S')

# 5. Crear un grafo utilizando la librería NetworkX
G = nx.DiGraph()
for index, row in stop_times.iterrows():
    if index == 0:  # El primer nodo no tiene arista previa
        G.add_node(row['stop_id'])
    else:
        prev_stop = stop_times.loc[index-1, 'stop_id']
        curr_stop = row['stop_id']
        weight = (row['arrival_time'] - stop_times.loc[index-1, 'departure_time']).seconds  # Peso de la arista en segundos
        G.add_edge(prev_stop, curr_stop, weight=weight)

@app.route('/ruta-corta', methods=['GET'])
def ruta_corta():

    origen = request.args.get('origen')
    destino = request.args.get('destino')

    # 6. Obtener la ruta más corta
    path = nx.dijkstra_path(G, source=origen, target=destino)

    # 7. Obtener información adicional de las paradas
    stops_info = stops[['stop_id', 'stop_name', 'stop_lat', 'stop_lon']]
    stops_info['stop_id'] = stops_info['stop_id'].map(unique_stop_ids)

    # 8. Filtrar las paradas en la ruta más corta
    stops_in_path = stops_info[stops_info['stop_id'].isin(path)]

    # 9. Crear una lista con la información de las paradas en la ruta más corta
    path_info = []
    for index, row in stops_in_path.iterrows():
        stop_info = {
            'name': row['stop_name'],
            'latitude': row['stop_lat'],
            'longitude': row['stop_lon']
        }
        path_info.append(stop_info)

    # 10. Crear un diccionario con la información de la ruta más corta y la información de las paradas
    result = {
        'path': path,
        'stops': path_info
    }

    # 11. Convertir el diccionario a formato JSON
    #result_json = json.dumps(result)

    # 12. Devolver el resultado en formato JSON
    #return result_json
    return jsonify(result)


    #URL ejemplo:
    #http://127.0.0.1:5000/ruta-corta?origen=Metro%20Polit%C3%A9cnico%20_0&destino=Eje%20Central%20y%20Poniente%20152_0
    
@app.route('/paradasgtfs', methods=['GET'])
def paradasgtfs():
    stops_info = stops[['stop_id', 'stop_name']]
    stops_info['stop_id'] = stops_info['stop_id'].map(unique_stop_ids)
    stops_list = []
    for index, row in stops_info.iterrows():
        stop_info = {
            'id': row['stop_id'],
            'name': row['stop_name']
        }
        stops_list.append(stop_info)

    resultadoo = {
        'stops': stops_list
    }

    return jsonify(resultadoo)

df_stops = pd.read_csv(r'C:/Users/carlo/Desktop/PlannerGTFS-V2-F/src/GTFS/Graphgtfs-V1.csv')
stopinfo = pd.read_csv(r'C:/Users/carlo/Desktop/PlannerGTFS-V2-F/src/GTFS/stop.csv')

GRAPH = nx.DiGraph()
GRAPH = nx.from_pandas_edgelist(df_stops, source='Origen', target='Destino', edge_attr='Distancia')

@app.route('/short-route', methods=['GET'])
def shortroute():

    origen = request.args.get('origen')
    destino = request.args.get('destino')

    path = nx.dijkstra_path(GRAPH, source=origen, target=destino, weight='Distancia')
    print(nx.dijkstra_path_length(GRAPH, source=origen, target=destino, weight='Distancia'))
    stops_info = stopinfo[['stop_id', 'stop_name', 'stop_lat', 'stop_lon', 'color']]
    stops_in_path = stops_info[stops_info['stop_id'].isin(path)]

    path_info = []
    for stop_id in path:
        stop_info = stops_in_path[stops_in_path['stop_id'] == stop_id].iloc[0]
        stop_info_dict = {
            'name': stop_info['stop_name'],
            'latitude': stop_info['stop_lat'],
            'longitude': stop_info['stop_lon'],
            'color': stop_info['color']
        }
        path_info.append(stop_info_dict)

    result = {
        'path': path,
        'stops': path_info
    }

    return jsonify(result)

@app.route('/allparadas', methods=['GET'])
def allparadas():
    stops_info = stopinfo[['stop_id', 'stop_name', 'stop_lat','stop_lon']]

    resultados = {
    'stops': stops_info.to_dict(orient='records')
    }
    return jsonify(resultados)

@app.route('/paradas', methods=['GET'])
def paradas():
    # 7. Obtener información adicional de las paradas
    stops_info = stops[['stop_id', 'stop_name']]
    stops_info['stop_id'] = stops_info['stop_id'].map(unique_stop_ids)

    path_info = []
    for index, row in stops_info.iterrows():
        stop_infor = {
            'id': row['stop_id'],
            'name': row['stop_name']
        }
        path_info.append(stop_infor)

    resultado = {
        'stops': path_info
    }

    return jsonify(resultado)


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.run()