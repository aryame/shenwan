import React, { useCallback, useEffect, useState } from 'react';
import { Form, DatePicker, Select, Row, Col, Input, Button, Table, Modal } from 'antd';
import './index.css'; 
import moment from 'moment';
import { getAllData } from '../api/index'
import ExcelJS from 'exceljs'

const { RangePicker } = DatePicker;
const { Option } = Select;
function Operation() {
    const [signBeginDateRange, setSignBeginDateRange] = useState([])
    const [signEndDateRange, setSignEndDateRange] = useState([])
    const [signStatus, setSignStatus] = useState('')
    const [signType, setSignType] = useState('')
    const [contractNo, setContractNo] = useState('')
    const [operationNo, setOperationNo] = useState('')
    const [signNo, setSignNo] = useState('')
    const [tradeName, setTradeName] = useState('')
    const [dataSource, setDataSource] = useState([])
    const onSearch = useCallback((_signBeginDateRange,_signEndDateRange,_signStatus, _signType,
        _contractNo, _operationNo, _signNo, _tradeName
        ) => {

        getAllData().then((res) => {
            if (res.code === '200') {
                const realSignStatus = _signStatus === undefined ? signStatus : _signStatus
                const realSignType = _signType === undefined ? signType : _signType
                const realOperationNo = _operationNo === undefined ? operationNo : _operationNo
                const realContractNo = _contractNo === undefined ? contractNo : _contractNo
                const realSignNo = _signNo === undefined ? signNo : _signNo
                const realTradeName = _tradeName === undefined ? tradeName : _tradeName
                const realSignBeginDateRange = _signBeginDateRange === undefined ? signBeginDateRange : _signBeginDateRange
                const realSignEndDateRange = _signEndDateRange === undefined ? signEndDateRange : _signEndDateRange
                console.log(realSignBeginDateRange, _signBeginDateRange, signBeginDateRange)
                const data = res.data.filter(item => {
                    if (realSignStatus) {
                        return item.signStatus === realSignStatus
                    }
                    return true
                })
                const data1 = data.filter(item => {
                    if (realSignType && realSignType !== '*') {
                        return item.signType === realSignType
                    }
                    return true
                })
                const data2 = data1.filter(item => {
                    if (realOperationNo) {
                        return item.operationNo === realOperationNo
                    }
                    return true
                })
                const data3 = data2.filter(item => {
                    if (realContractNo) {
                        return item.contractNo === realContractNo
                    }
                    return true
                })
                const data4 = data3.filter(item => {
                    if (realSignNo) {
                        return item.signNo === realSignNo
                    }
                    return true
                })
                const data5 = data4.filter(item => {
                    if (realTradeName) {
                        return item.tradeName === realTradeName
                    }
                    return true
                })
                const data6 = data5.filter(item => {
                    if (realSignBeginDateRange.length === 2) {
                        return(
                            moment(item.beginDate).diff(realSignBeginDateRange[0]) >=0 && moment(item.beginDate).isAfter(realSignBeginDateRange[1]) <=0
                        )
                    }
                    return true
                })
                const data7 = data6.filter(item => {
                    if (realSignEndDateRange.length === 2) {
                        return(
                            moment(item.endDate).diff(realSignEndDateRange[0]) >=0 && moment(item.endDate).isAfter(realSignEndDateRange[1]) <=0
                        )
                    }
                    return true
                })
                setDataSource(data7)
            }
        })
    }, [contractNo, operationNo, signBeginDateRange, signEndDateRange, signNo, signStatus, signType, tradeName])
    const onReset = () => {
        setSignBeginDateRange([])
        setSignEndDateRange([])
        setSignStatus('')
        setSignType('')
        setContractNo('')
        setOperationNo('')
        setSignNo('')
        setTradeName('')
        onSearch([],[],'','','','','','')
    }
    const signBeginDateRangeChange = (_dates, dateStr) => {
        console.log([moment(dateStr[0]), moment(dateStr[1])])
        setSignBeginDateRange([moment(dateStr[0]), moment(dateStr[1])])
    }
    const signEndDateRangeChange = (_dates, dateStr) => {
        setSignEndDateRange([moment(dateStr[0]), moment(dateStr[1])])
    }
    const onSignStatueChange = (val) => {
        setSignStatus(val)
    }
    const onSignTypeChange = (val) => {
        setSignType(val)
    }
    const onContractNoChange = (e) => {
        setContractNo(e.target.value)
    }
    const onOperationNoChange = (e) => {
        setOperationNo(e.target.value)
    }
    const onSignNoChange = (e) => {
        setSignNo(e.target.value)
    }
    const onTradeNameChange = (e) => {
        setTradeName(e.target.value)
    }
    const download = async () => {
        const workbook = new ExcelJS.Workbook()
        const sheet = workbook.addWorksheet('数据表名')
        const tableRows  = dataSource.map(item => {
            let tmp = []
            for(let i in item) {
                tmp.push(item[i])
            }
            return tmp
        })
        const col = [
            { name: "签约发起时间"},
            { name: "签约结束时间"},
            { name: "协议编号"},
            { name: "签约状态"},
            { name: "签约类型"},
            { name: "操作编号"},
            { name: "代签产品编号"},
            { name: "交易对手名称"}
        ]
        sheet.addTable({
            ref: 'A1',
            columns: col,
            rows: tableRows,
        })
        const buffer = await workbook.xlsx.writeBuffer()
        // 通过blob的方式进行下载

        const blob = new Blob([buffer])
        const downloadElement = document.createElement('a')
        downloadElement.style.display = 'none'
        const href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.href = href
        downloadElement.download = 'info.xlsx' // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
   

    }
    const onCheck = (record) => {
        Modal.info({
            title: '具体信息',
            content: (
              <div>
                <div><span>签约发起时间: </span><span>{record.beginDate}</span></div>
                <div><span>签约结束时间: </span><span>{record.endDate}</span></div>
              </div>
            ),
            onOk() {},
          });
    }
    const columns = [
        {
          title: '签约发起时间',
          dataIndex: 'beginDate',
          key: 'beginDate',
        },
        {
          title: '签约结束时间',
          dataIndex: 'endDate',
          key: 'endDate',
        },
        {
          title: '协议编号',
          dataIndex: 'contractNo',
          key: 'contractNo',
        },
        {
            title: '签约状态',
            dataIndex: 'signStatus',
            key: 'signStatus',
        },
        {
            title: '交易对手',
            dataIndex: 'tradeName',
            key: 'tradeName',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Button onClick={() => {onCheck(record)}}>查看</Button>
            ),
          },
      ];

    useEffect(() => {
        onSearch()
    },[])
    return (
      <div>
        <div className='operation'>
            <Form
                labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
            >
                <Row>
                    <Col span={6}>
                        <Form.Item label="签约发起日期">
                            <RangePicker value={signBeginDateRange} onChange={signBeginDateRangeChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item label="签约结束日期">
                            <RangePicker value={signEndDateRange} onChange={signEndDateRangeChange}/>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item label="签约状态">
                            <Select
                                showSearch
                                optionFilterProp="children"
                                onChange={onSignStatueChange}
                                value={signStatus}
                            >
                                <Option value="1">已签约</Option>
                                <Option value="0">未签约</Option>
                                <Option value="2">暂停签约</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item label="签约类型">
                            <Select
                                showSearch
                                optionFilterProp="children"
                                onChange={onSignTypeChange}
                                value={signType}
                            >
                                <Option value="*">全部</Option>
                                <Option value="0">类型1</Option>
                                <Option value="1">类型2</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item label="协议编号">
                            <Input value={contractNo} onChange={onContractNoChange} />
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item label="操作事件编号">
                            <Input value={operationNo} onChange={onOperationNoChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Form.Item label="代签产品编号">
                            <Input value={signNo} onChange={onSignNoChange} />
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={1}>
                        <Form.Item label="交易对手名称">
                            <Input value={tradeName} onChange={onTradeNameChange} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
        <div className='btnGroup'>
            <Button type="primary" onClick={() => onSearch()}>搜索</Button>
            <Button className='btn' onClick={onReset}>重置</Button>
            <Button type="primary" className='btn' onClick={download}>下载</Button>
        </div>
        <Table id="TableToExport" dataSource={dataSource} columns={columns} />;
      </div>
    );
  }
  
  export default Operation;