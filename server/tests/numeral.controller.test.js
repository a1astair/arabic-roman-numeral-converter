import request from 'supertest'
import app from "../app"
import mongoose from "mongoose"

describe('Test Roman Conversion', () => {
  it('should convert to roman', async () => {
    const payload = {numeral: "50", convertTo: "roman"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: true,
      message: "Success! Converted to Roman",
      answer: "L"
    }))
  })

  it('should fail on invalid roman', async () => {
    const payload = {numeral: "abc", convertTo: "roman"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: false,
      message: "Error, not a number, please try again",
    }))
  })

  it('should fail on negative arabic', async () => {
    const payload = {numeral: "-1", convertTo: "roman"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: false,
      message: "Error, number must be above 0 and below 3999999, please try again",
    }))
  })

  it('should fail on above 3999999 arabic', async () => {
    const payload = {numeral: "39999999", convertTo: "roman"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: false,
      message: "Error, number must be above 0 and below 3999999, please try again",
    }))
  })
})

describe('Test Arabic Conversion', () => {
  it('should convert to arabic', async () => {
    const payload = {numeral: "ML", convertTo: "arabic"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: true,
      message: "Success! Converted to Arabic",
      answer: 1050
    }))
  })

  it('should fail on arabic numeral', async () => {
    const payload = {numeral: "123", convertTo: "arabic"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: false,
        message: "Error, not a valid Roman numeral, please try again",
    }))
  })

  it('should fail on negative arabic numeral', async () => {
    const payload = {numeral: "-1", convertTo: "arabic"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: false,
        message: "Error, not a valid Roman numeral, please try again",
    }))
  })

  it('should fail on invalid roman numeral', async () => {
    const payload = {numeral: "MghjXI", convertTo: "arabic"}
    const res = await request(app)
      .post('/api/convert')
      .send(payload)
      .set('Content-Type', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(expect.objectContaining({
      success: false,
        message: "Error, not a valid Roman numeral, please try again",
    }))
  })
 
})

beforeAll(done => {
  done()
})

afterAll(done =>{
  mongoose.connection.close()
  done();
})