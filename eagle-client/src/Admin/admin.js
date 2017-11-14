import React, { Component } from 'react';

import { Button, Checkbox, Form } from 'semantic-ui-react'

export default class Admin extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Date</label>
            <input placeholder='02/12/2017' />
          </Form.Field>
          <Form.Field>
            <label>Day</label>
            <input placeholder='Monday' />
          </Form.Field>
          <Form.Field>
            <label>Shift</label>
            <input placeholder='Morning' />
          </Form.Field>
          <Form.Field>
            <label>Skill</label>
            <input placeholder='Expert' />
          </Form.Field>
          
          <Button type='submit'>Submit</Button>
        </Form>
      </div>

    )
  }


}