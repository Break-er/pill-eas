<div align=center>
 <img src="https://user-images.githubusercontent.com/68578916/167850371-1247d797-f7ea-48f0-a15d-6e22c59cc91d.svg" width="150"/>
 <h2>환경을 생각한 의약품의 복용부터 처리까지, 필리즈(pill:ease)</h2>
 </div>

**Pill:ease(필리즈)** 는 환경을 생각한 복용부터 처리까지 도와주는 서비스를 제공하는 애플리케이션입니다. 올바른 약 복용부터 남은 약에 대한 처리 방법을 사용자에게 알림으로써 폐의약품 배출과 관련한 시민들의 인식을 개선하고, 안전한 처리로 국민건강과 환경을 지킬 수 있습니다.  

**Pill:ease** provides a service that helps from taking the medicines to processing to take care of environment. By informing users of how to handle the remaining drugs from taking the right drugs to the right ones, people will be able to improve their awareness of the discharge of waste drugs and protect national health and the environment through safe treatment.

<div align="center">
 <img src="https://img.shields.io/badge/java-%23ED8B00.svg?logo=java&logoColor=white" />
 <img src="https://img.shields.io/badge/javascript-F7DF1E?logo=javascript&logoColor=white">
 <img src="https://img.shields.io/badge/react_native-%2320232a.svg?logo=react&logoColor=%2361DAFB" />
 <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?logo=firebase" />
 <img src="https://img.shields.io/badge/Google Cloud-4285F4?style=flat-square&logo=Google Cloud&logoColor=white"/>
 <img src="https://img.shields.io/badge/Android%20Studio-3DDC84.svg?logo=android-studio&logoColor=white" />
</div>

 <br />

## 📗 Purpose
올바르지 않은 폐의약품 폐기는 생태계의 교란을 일으키고 토양과 수질을 오염시킵니다. 건강보험심사 평가원 설문조사에 의하면 폐의약품의 배출 방법은 인지율 60%, 폐의약품 수거함의 위치 인지율은 16%, 실제로 폐의약품을 올바르게 폐기하는 답변자는 오직 8%로 현저히 낮은 수준입니다. 이에 저희는 폐의약품 처리에 대한 인식과 실천 부분에서의 개선을 목표로 삼았습니다. 의약품 복용 관리 서비스와 더불어 복용 후 남은 약품에 대해 올바른 처리 방법을 안내하고 사용자 주변의 수거함 위치를 제공하는 서비스 필리즈를 개발하게 되었습니다. 

## 📘 Description
### A) 애플리케이션 소개  
  필리즈(pii:ease)는 알약을 뜻하는 pill과 쉬움을 의미하는 ease를 합성한 이름으로 의약품 처리를 쉽게 도와주는 애플리케이션입니다. 또한, 영어 단어 please와 비슷한 발음으로 모두에게 올바른 처리를 부탁한다는 의미도 포함합니다.  
 안전한 의약품 사용을 위해서는 복용 전 주의사항뿐만 아니라 복용 후 처리 방법 역시 중요합니다.  본 서비스는 사용자가 처방받은 의약품의 정해진 복용 방법대로 일정한 시간 간격을 두고 복용하는 것에 알림 기능을 제공하며, 복용 후 남은 약품에 대해 올바른 처리 방법을 안내하고 집 주변의 전용 수거함 위치를 제시합니다. 올바른 약 복용부터 남은 약에 대한 처리 방법을 사용자에게 알림으로써 폐의약품 배출과 관련한 시민들의 인식을 개선하고, 안전한 처리로 국민 건강과 환경을 지키는 것을 서비스의 목표로 삼았습니다.  

### B)  구현 사항
**[복용 기록 및 알림]**    
  사용자는 약의 복용 시작 날짜와 종료 날짜, 일 단위 복용 주기,  일일 복용 횟수 및 복용 예정 시간과 같은 정보들을 입력하고 해당 주기 및 시간에  맞춘 알림을 받을 수 있습니다.  

**[내 주변 수거함]**  
  올바른 의약품 보관 및 폐기 법에 대한 안내를 확인할 수 있으며, 현재 사용자 위치를 중심으로 주변 폐의약품 수거 약국 및 수거함들의 위치 및 상세 정보가 지도에 표시됩니다.  

  ![스크린샷 2022-10-24 오전 12 44 59](https://user-images.githubusercontent.com/68578916/197401819-494d285c-735c-4b88-abea-7fbc9d60c614.png)


### C) 차별화된 특징  
  기존의 의약품 복용 알림 서비스들은 사용자가 규칙적으로 잊지 않고 약을 먹을 수 있도록 알림 기능 및 복용 기록 일지 기능 등을 제공하고 있습니다. 이에 본 서비스는 이미 상용화된 서비스의 기능에 의약품 복용 후의 남은 약의 처리 방법을 안내하고 사용자 위치 정보 기반 주변 수거처 위치를 제공하는 기능을 추가하여 올바르게 의약품을 복용하고 처리하는 과정까지 안내합니다.  
  
### D) 활용 공공데이터  
  활용한 데이터로는 공공데이터포털에서 제공하는 '서울특별시 은평구, 송파구, 강동구, 용산구, 동작구, 강서구, 양천구, 동대문구, 광진구, 마포구_폐의약품 수거 약국 및 수거함 위치 현황' 데이터 셋을 이용했고, 해당 10개의 지역구 외에 추가로 제공되는 데이터 셋이 있다면 어플에 추가할 예정입니다. 이후, 서울특별시에서 범위를 넓혀 전국에서 이용 가능한 서비스를 제공할 계획입니다. 
  
### E) 기대효과
![스크린샷 2022-10-24 오전 12 50 05](https://user-images.githubusercontent.com/68578916/197402065-c1129fa6-1a74-4dbb-9074-583546c5479b.png)



## 🛠 System Architecture
<img src="https://user-images.githubusercontent.com/68578916/167899172-0663c25d-dd1f-459f-99e7-faace27cc45b.png" width="70%">

## 📹 Portfolio Video
[KBSC2022_필리즈(BREAKER)_포트폴리오영상](https://www.youtube.com/watch?v=vUDdXVjjg_s)



## ✨ Contributors
<table>
    <tr>
        <td align="center"><img src="https://github.com/dongyeon-0822.png" width="80"></td>
        <td align="center"><img src="https://github.com/HyewonKkang.png" width="80">
        </td>
        <td align="center"><img src="https://github.com/Gu-nuu.png" width="80"></td>
        <td align="center"><img src="https://github.com/leetaekyu2077.png" width="80"></td>
    </tr>
    <tr>
        <td align="center"><a href="https://github.com/dongyeon-0822">강동연</a></td>
        <td align="center"><a href="https://github.com/HyewonKkang">강혜원</a></td>
        <td align="center"><a href="https://github.com/Gu-nuu">김건우</a></td>
        <td align="center"><a href="https://github.com/leetaekyu2077">이태규</a></td>
    </tr>
   <tr>
        <td align="center">Back-end</td>
        <td align="center">Front-end</td>
        <td align="center">Front-end</td>
        <td align="center">Back-end</td>
    </tr>
</table>
