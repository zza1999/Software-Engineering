import React from 'react';
import {  Button, Table } from 'antd';
import './index.css';

class RDRTable extends React.Component {
    
    handleRDROff = () => {
        console.log('关闭详单');
        this.props.handleRDROff();
    }

    render() {

        const columns = [
            {
              title: 'Room_id',
              dataIndex: 'room_id',
            },
            {
              title: 'Speed',
              dataIndex: 'speed',
            },
            {
              title: 'Rate',
              dataIndex: 'rate',
            },
            {
                title: 'Start_time',
                dataIndex: 'start_time',
            },
            {
                title: 'End_time',
                dataIndex: 'end_time',
            },
            {
                title: 'Dur_cost',
                dataIndex: 'dur_cost',
            }
          ];
          const data = [
            {
                key: '1',
                room_id: 101,
                speed: 1,
                rate: 1.5,
                start_time: '2020-04-05 22:22:22',
                end_time: '2020-04-05 22:22:22',
                dur_cost: 12.5,
            },
            {
                key: '2',
                room_id: 101,
                speed: 2,
                rate: 2,
                start_time: '2020-04-05 22:22:22',
                end_time: '2020-04-05 22:22:22',
                dur_cost: 15,
            },
          ];

        return (
            <div>
                <Table columns={columns} dataSource={data} size="middle" />
                <Button danger className={"table-off-style"} onClick={this.handleRDROff}>关闭详单</Button>
            </div>
        );
    }

}



class BillTable extends React.Component {
    
    handleBillOff = () => {
        console.log('关闭帐单');
        this.props.handleBillOff();
    }
    
    render() {

        const columns = [
            {
              title: 'Room_id',
              dataIndex: 'room_id',
            },
            {
                title: 'Check_in_time',
                dataIndex: 'check_in_time',
            },
            {
                title: 'Check_out_time',
                dataIndex: 'check_out_time',
            },
            {
                title: 'Cost',
                dataIndex: 'cost',
            }
          ];
          const data = [
            {
                key: '1',
                room_id: 101,
                check_in_time: '2020-04-05 22:22:22',
                check_out_time: '2020-04-05 22:22:22',
                cost: 12.5,
            },
          ];

        return (
            <div>
                <Table columns={columns} dataSource={data} size="middle" />
                <Button danger onClick={this.handleBillOff}>关闭帐单</Button>
            </div>
        );
    }

}

export {RDRTable,BillTable}