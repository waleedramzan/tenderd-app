import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Vehicle() {
    const [vehicles, setVehicles] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/vehicle')
            .then(res => res.json())
            .then(res => {
                const vehs = res.map((v: any) => {
                    return {
                        ...v,
                        link: `https://maps.google.com/?q=${v?.location?.coordinates?.toString()}`
                    }
                });
                setVehicles(vehs);
            });

        const ws = new WebSocket('ws://localhost:8081');

        ws.onopen = function open() {
            console.log('Connected');
        };

        ws.onmessage = (message: any) => {
            const _vehicles = JSON.parse(message.data);
            const vehs = _vehicles.map((v: any) => {
                return {
                    ...v,
                    link: `https://maps.google.com/?q=${v?.location?.coordinates?.toString()}`
                }
            })
            setTimeout(() => {
                setVehicles(prev => [...vehs]);
            }, 1000)
        };

        return () => {
            ws.close();
        };
    }, [])

    return (
        <>
            {vehicles.length ?
                <table>
                    <tr>
                        <th>VIN</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Year</th>
                        <th>Status</th>
                        <th>Location</th>
                        <th>Speed</th>
                        <th>Last Updated</th>
                    </tr>
                    {vehicles.map((veh: any) => {
                        return <>
                            <tr key={veh._id}>
                                <td>{veh.vin}</td>
                                <td>{veh.make}</td>
                                <td>{veh.model}</td>
                                <td>{veh.year}</td>
                                <td>{veh.status}</td>
                                <td>
                                    <a href={veh.link} target="_blank">
                                        {veh?.location?.coordinates?.toString()}
                                    </a>

                                </td>
                                <td>{veh.speed}</td>
                                <td>{veh.updatedAt}</td>
                            </tr>
                        </>
                    })}
                </table>
                : 'No Vehicles found'}
        </>
    )
}