import React from "react"
import MainLayout from "../components/MainLayout"
import { Title, SubTitle, SubSubTitle, BodyText } from "../components/Typo"
import Divider from "../components/Divider"
import { contributors } from "../models/information"

const containerSize = 516

const renderPerson = a =>
  a.url ? (
    <a href={a.url} target="_blank" css={{ color: "inherit" }}>
      {a.name}
    </a>
  ) : (
    a.name
  )
const ContributorSection = ({ name, contributors }) => {
  return (
    <div css={{ color: "black", textDecoration: "none", marginBottom: 16 }}>
      <SubSubTitle>{name}</SubSubTitle>
      {contributors
        .map(a => renderPerson(a))
        .reduce((prev, curr) => [prev, ", ", curr])}
    </div>
  )
}

export default () => (
  <MainLayout activeNavBarSection="about">
    <div css={{ maxWidth: containerSize, margin: "0 auto", padding: 10 }}>
      <Title mt={16} mb={8}>
        เกี่ยวกับ ELECT Live
      </Title>
      <SubTitle mb={8}>ที่มาของข้อมูล</SubTitle>
      <BodyText mb={32}>
        ข้อมูลที่ใช้ 'มาจาก กกต.' โดยจะทยอยส่งเข้ามาจากทุกหน่วยเลือกตั้ง กว่า
        90,000 หน่วยเลือกตั้งทั่วประเทศ เมื่อนับคะแนนแต่ละหน่วยเสร็จสิ้น
        (โดยคะแนนจะเริ่มทยอยเข้ามาตั้งแต่เวลา 18.00 น. และคาดว่าจะสิ้นสุดในเวลา
        21.30 น. โดยประมาณ)
      </BodyText>
      <SubTitle mb={8}>ความคลาดเคลื่อนของข้อมูล</SubTitle>
      <BodyText mb={32}>
        ข้อมูลทั้งหมดเป็นการนับคะแนน 'อย่างไม่เป็นทางการ' ซึ่ง
        กกต.จะต้องตรวจสอบอีกครั้ง ก่อนประกาศรับรองผลภายหลังทีละเขต จนครบ 350 เขต
        ซึ่งเป็นไปได้ว่าบางเขตอาจต้องเลือกตั้งใหม่ ทำให้จำนวน ส.ส.
        ของแต่ละพรรคสามารถเปลี่ยนแปลงได้
      </BodyText>
      <SubTitle mb={8}>การหยุดนับคะแนน</SubTitle>
      <BodyText mb={32}>
        เนื่องจากเป็นข้อมูลการนับคะแนนอย่างไม่เป็นทางการ กกต.
        จะยุติการส่งข้อมูลให้เมื่อถึง 95% ของทุกเขตเลือกตั้งทั่วประเทศ
        เพื่อป้องกันปัญหาการฟ้องร้องภายหลัง
        เพราะเป็นไปได้ที่บางเขตเลือกตั้งจะชนะกันด้วยคะแนนฉิวเฉียด
        ที่ผลอาจเปลี่ยนแปลงได้เมื่อมีการนับคะแนนอย่างเป็นทางการ
      </BodyText>
      <Divider mb={32} />
      <SubTitle mb={8}>อาสาสมัครที่ร่วมพัฒนา</SubTitle>
      {
        // @todo #1 add contributors
      }
      <BodyText>
        <ContributorSection
          name="เขียนโปรแกรม 💻"
          contributors={contributors.coders}
        />
        <ContributorSection
          name="ออกแบบ 🎨"
          contributors={contributors.designers}
        />
        <ContributorSection
          name="ติดต่อประสานงาน และด้านอื่นๆ ☎️"
          contributors={contributors.others}
        />
      </BodyText>
    </div>
  </MainLayout>
)
