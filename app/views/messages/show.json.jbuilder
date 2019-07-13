json.messages    @messages.each do |message|
  json.name        message.user_name
  json.date        message.created_at.strftime("%y/%m/%d %H:%M")
  json.image       message.image.url
  json.id          message.id
  json.content     message.content
end