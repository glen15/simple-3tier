/* eslint-disable no-undef */
const axios = require('axios');
const expect = require('chai').expect;
require('dotenv').config();

describe('서버 설정을 확인합니다.', () => {
  it('서버가 실행중이라면, 서버의 응답으로 "서버 실행중"를 받아야 합니다.', async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}`);
    expect(res.data).to.be.eql('서버 실행중');
  });
});

describe('정적 웹페이지 설정을 확인합니다.', () => {
  it('S3에 정적 파일들이 업로드 되었는지 확인합니다.', async () => {
    const result = await axios.get(`${process.env.S3_ADDRESS}`);
    const title = result.data.includes('<!doctype html>');
    expect(title).to.be.eql(true);
  });
});

describe('데이터 베이스 연결 확인', () => {
  it('RDS를 배포하고, server의 .env에 연결정보를 입력했다면, "/status" 요청에 대한 응답이 { isLogin: true, isConnectedToDatabase: true } 이어야 한다', async () => {
    const res = await axios
      .post(
        `${process.env.REACT_APP_API_URL}/signin`,
        {
          username: 'admin',
          password: '1234'
        },
        { withCredentials: true }
      );

    const checkStatus = await axios.get(`${process.env.REACT_APP_API_URL}/status`,
      {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${res.data}`
        }
      });

    expect(checkStatus.data).to.be.eql({ isLogin: true, isConnectedToDatabase: true });
  });
});
