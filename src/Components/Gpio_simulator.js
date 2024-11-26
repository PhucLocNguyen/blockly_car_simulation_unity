function Gpio_simulator() {
    return ( <>
    <div id="simulationContentDiv" className="content rightContent">
    <div id="pinsDiv" className="rightContentTop">
      <table id="pinoutTable">
        <tbody>
          <tr>
            <th className="noborder">BCM</th>
            <th className="noborder">Altern</th>
            <th className="noborder" colspan="2">Header</th>
            <th className="noborder">Altern</th>
            <th className="noborder">BCM</th>
          </tr>
          <tr>
            <td>-</td>
            <td><span style="color: #ff0000;">3.3v</span></td>
            <th id="pin1">1</th>
            <th id="pin2">2</th>
            <td align="center"><span className="pinVolt">5v</span></td>
            <td align="center">-</td>
          </tr>
          <tr>
            <td>2</td>
            <td><span className="piI2c">SDA</span></td>
            <th id="pin3">3</th>
            <th id="pin4">4</th>
            <td><span className="pinVolt">5v</span></td>
            <td>-</td>
          </tr>
          <tr>
            <td>3</td>
            <td><span className="piI2c">SCL</span></td>
            <th id="pin5">5</th>
            <th id="pin6">6</th>
            <td><span className="pinGround">0v</span></td>
            <td>-</td>
          </tr>
          <tr>
            <td>4</td>
            <td><span className="piGpio">GPCLK0</span></td>
            <th id="pin7">7</th>
            <th id="pin8">8</th>
            <td><span style="color: #ffff00;">TxD</span></td>
            <td>14</td>
          </tr>
          <tr>
            <td>-</td>
            <td><span className="pinGround">0v</span></td>
            <th id="pin9">9</th>
            <th id="pin10">10</th>
            <td><span style="color: #ffff00;">RxD</span></td>
            <td>15</td>
          </tr>
          <tr>
            <td>17</td>
            <td><span className="piGpio">-</span></td>
            <th id="pin11">11</th>
            <th id="pin12">12</th>
            <td><span className="piGpio">PWM0</span></td>
            <td>18</td>
          </tr>
          <tr>
            <td>27</td>
            <td><span className="piGpio">-</span></td>
            <th id="pin13">13</th>
            <th id="pin14">14</th>
            <td><span className="pinGround">0v</span></td>
            <td>-</td>
          </tr>
          <tr>
            <td>22</td>
            <td><span className="piGpio">-</span></td>
            <th id="pin15">15</th>
            <th id="pin16">16</th>
            <td><span className="piGpio">-</span></td>
            <td>23</td>
          </tr>
          <tr>
            <td>-</td>
            <td><span style="color: #ff0000;">3.3v</span></td>
            <th id="pin17">17</th>
            <th id="pin18">18</th>
            <td><span className="piGpio">-</span></td>
            <td>24</td>
          </tr>
          <tr>
            <td>10</td>
            <td><span className="piSpi">MOSI</span></td>
            <th id="pin19">19</th>
            <th id="pin20">20</th>
            <td><span className="pinGround">0v</span></td>
            <td>-</td>
          </tr>
          <tr>
            <td>9</td>
            <td><span className="piSpi">MISO</span></td>
            <th id="pin21">21</th>
            <th id="pin22">22</th>
            <td><span className="piGpio">-</span></td>
            <td>25</td>
          </tr>
          <tr>
            <td>11</td>
            <td><span className="piSpi">SCLK</span></td>
            <th id="pin23">23</th>
            <th id="pin24">24</th>
            <td><span className="piSpi">CE0</span></td>
            <td>8</td>
          </tr>
          <tr>
            <td>-</td>
            <td><span className="pinGround">0v</span></td>
            <th id="pin25">25</th>
            <th id="pin26">26</th>
            <td><span className="piSpi">CE1</span></td>
            <td>7</td>
          </tr>
          <tr>
            <th className="noborder">BCM</th>
            <th className="noborder">Altern</th>
            <th className="noborder" colspan="2">Header</th>
            <th className="noborder">Altern</th>
            <th className="noborder">BCM</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="jsConsoleDiv" className="rightContentBottom">
      <pre id="jsConsolePre">Simulated print output.</pre>
    </div>
  </div>
  <div id="executionContentDiv" className="content rightContent">
    <div id="pythonCodeDiv" className="rightContentTop">
      <pre id="pythonCodePre">Python code goes here.</pre>
    </div>
    <div id="pythonConsoleDiv" className="rightContentBottom">
      <pre id="pythonConsolePre">Python real console output goes here.</pre>
    </div>
  </div>
    </> );
}

export default Gpio_simulator;