import torch # for deep neural network
from transformers import BertTokenizer, BertForSequenceClassification


model = BertForSequenceClassification.from_pretrained("bert-base-uncased", num_labels=2)
model.load_state_dict(torch.load("newBert_dataset.pth"))
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')


def predict_fake_tweet(text, model, tokenizer):
    model.eval()  # Set the model to evaluation mode
    
    # Tokenize the text
    inputs = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=128,
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt'
    )

    # Move inputs to appropriate device
    input_ids = inputs['input_ids'].to(device)
    attention_mask = inputs['attention_mask'].to(device)

    # Forward pass
    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
    
    # Get predicted label
    logits = outputs.logits
    predicted_label = torch.argmax(logits, dim=1).item()
    
    # Map label to text
    label_text = "False" if predicted_label == False else "True"
    
    return label_text




text_to_check = "Please click on this link to get twitter blue tick verficiation at just 99 dollars"




predicted_label = predict_fake_tweet(text_to_check, model, tokenizer)
print(f"The predicted label for the text '{text_to_check}' is: {predicted_label}")

if(predicted_label):
    print("FAKE TWIT DETECTED")
else:
    print("REAL TWIT")
