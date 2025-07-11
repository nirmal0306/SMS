// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-chatbot',
//   templateUrl: './chatbot.component.html',
//   styleUrls: ['./chatbot.component.css']
// })
// export class ChatbotComponent {
//   userMessage = '';
//   chatLog: { sender: string, message: string, image?: string }[] = [];
//   isBotTyping = false; // Tracks typing state
//   private adminKeywords = ['admin', 'system', 'status']; // Keywords for admin questions
//   private responseDelay = 300; // 1.5 seconds delay
//   private greetingKeywords = ['hi', 'hy', 'hey', 'hello']; // Greetings
//   private howAreYouKeywords = ['how are you', 'how you doing', 'how’s it going']; // How are you variants
//   private helpKeywords = ['help', 'i need help', 'i need you', 'assist me']; // Help requests
//   private residentKeywords = ['resident', 'residents', 'tenant', 'tenants']; // Resident queries
//   private visitorKeywords = ['visitor', 'visitors', 'guest', 'guests']; // Visitor queries
//   private maintenanceKeywords = ['maintenance', 'maintenance record', 'payment history', 'maintenance data'];
//   private totalMaintenanceKeywords = ['total maintenance', 'total payment', 'maintenance summary', 'total maintenance amount'];
//   private expectingTotalMaintenanceEmail = false;
//   private expectingMaintenanceEmail = false;
//   private expectingVisitorEmail = false; // Flag for visitor email
//   private expectingEmail = false; // Tracks if bot is waiting for an email
//   private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
//   private baseImageUrl = 'http://localhost:5000'; // Base URL for image paths

//   constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

//   sendMessage() {
//     if (!this.userMessage.trim()) return;

//     // Add user message to chat log immediately
//     this.chatLog.push({ sender: 'user', message: this.userMessage });
//     this.isBotTyping = true; // Show typing indicator

//     const userMessageLower = this.userMessage.trim().toLowerCase();

//     // Check if expecting an email and validate email format
//     if (this.expectingEmail && this.emailRegex.test(this.userMessage.trim())) {
//       const email = this.userMessage.trim();
//       setTimeout(() => {
//         this.fetchResidentDetails(email);
//         this.isBotTyping = false; // Hide typing indicator
//       }, this.responseDelay);
//       setTimeout(() => {
//         this.fetchTotalMaintenance(email);
//         this.isBotTyping = false; // Hide typing indicator
//       }, this.responseDelay);
//       this.userMessage = '';
//       this.expectingEmail = false;
//       return;
//     }else if (this.expectingVisitorEmail && this.emailRegex.test(this.userMessage.trim())) {
//       const email = this.userMessage.trim();
//       setTimeout(() => {
//         this.fetchVisitorDetails(email); // Fetch visitor info
//         this.isBotTyping = false;
//       }, this.responseDelay);
//       this.userMessage = '';
//       this.expectingVisitorEmail = false;
//       return;
//     } else if (this.expectingMaintenanceEmail && this.emailRegex.test(this.userMessage.trim())) {
//       const email = this.userMessage.trim();
//       setTimeout(() => {
//         this.fetchMaintenanceData(email);
//         this.isBotTyping = false;
//       }, this.responseDelay);
//       this.userMessage = '';
//       this.expectingMaintenanceEmail = false;
//       return;
//     }else if (this.expectingTotalMaintenanceEmail && this.emailRegex.test(this.userMessage.trim())) {
//       const email = this.userMessage.trim();
//       setTimeout(() => {
//         this.fetchTotalMaintenance(email);
//         this.isBotTyping = false;
//       }, this.responseDelay);
//       this.userMessage = '';
//       this.expectingTotalMaintenanceEmail = false;
//       return;
//     }
//     else if (this.expectingEmail) {
//       // Invalid email format
//       setTimeout(() => {
//         this.chatLog.push({ sender: 'bot', message: 'Please provide a valid email address.' });
//         this.isBotTyping = false; // Hide typing indicator
//       }, this.responseDelay);
//       this.userMessage = '';
//       return;
//     }

//     // Check for greetings (hi, hy, hey, hello)
//     if (this.greetingKeywords.includes(userMessageLower)) {
//       setTimeout(() => {
//         this.chatLog.push({ sender: 'bot', message: 'Hi! How can I help you?' });
//         this.isBotTyping = false; // Hide typing indicator
//       }, this.responseDelay);
//       this.userMessage = '';
//       return;
//     }

//     // Check for "how are you" or similar
//     if (this.howAreYouKeywords.includes(userMessageLower)) {
//       setTimeout(() => {
//         this.chatLog.push({ sender: 'bot', message: 'I am good. What about you?' });
//         this.isBotTyping = false; // Hide typing indicator
//       }, this.responseDelay);
//       this.userMessage = '';
//       return;
//     }

//     // Check for help requests
//     if (this.helpKeywords.some(keyword => userMessageLower.includes(keyword))) {
//       setTimeout(() => {
//         this.chatLog.push({ sender: 'bot', message: 'Tell me. I am here to help you sir!' });
//         this.isBotTyping = false; // Hide typing indicator
//       }, this.responseDelay);
//       this.userMessage = '';
//       return;
//     }

//     // Check for resident queries
//     if (this.residentKeywords.some(keyword => userMessageLower.includes(keyword))) {
//       setTimeout(() => {
//         this.chatLog.push({ sender: 'bot', message: 'Please provide the resident email ID' });
//         this.isBotTyping = false; // Hide typing indicator
//       }, this.responseDelay);
//       this.expectingEmail = true; // Set flag to expect email in next message
//       this.userMessage = '';
//       return;
//     }
//     // Check for visitor queries
// if (this.visitorKeywords.some(keyword => userMessageLower.includes(keyword))) {
//   setTimeout(() => {
//     this.chatLog.push({ sender: 'bot', message: 'Please provide the visitor email ID' });
//     this.isBotTyping = false;
//   }, this.responseDelay);
//   this.expectingVisitorEmail = true;
//   this.userMessage = '';
//   return;
// }
// // Check for maintenance queries
// if (this.maintenanceKeywords.some(keyword => userMessageLower.includes(keyword))) {
//   setTimeout(() => {
//     this.chatLog.push({ sender: 'bot', message: 'Please provide the resident email ID to fetch maintenance data.' });
//     this.isBotTyping = false;
//   }, this.responseDelay);
//   this.expectingMaintenanceEmail = true;
//   this.userMessage = '';
//   return;
// }
// // Check for total maintenance queries
// if (this.totalMaintenanceKeywords.some(keyword => userMessageLower.includes(keyword))) {
//   setTimeout(() => {
//     this.chatLog.push({ sender: 'bot', message: 'Please provide the resident email ID to fetch total maintenance paid.' });
//     this.isBotTyping = false;
//   }, this.responseDelay);
//   this.expectingTotalMaintenanceEmail = true;
//   this.userMessage = '';
//   return;
// }




//     // Check if the message contains admin keywords
//     const isAdminQuestion = this.adminKeywords.some(keyword =>
//       userMessageLower.includes(keyword)
//     );

//     // Send message to backend for other cases
//     this.http
//       .post<any>('http://localhost:5000/chatbot', {
//         message: this.userMessage,
//         isAdmin: isAdminQuestion // Pass admin flag to backend
//       })
//       .subscribe({
//         next: (response) => {
//           setTimeout(() => {
//             this.chatLog.push({ sender: 'bot', message: response.reply });
//             this.isBotTyping = false; // Hide typing indicator
//           }, this.responseDelay);
//           this.userMessage = '';
//         },
//         error: (err) => {
//           setTimeout(() => {
//             this.chatLog.push({ sender: 'bot', message: 'Sorry, something went wrong. Please try again.' });
//             this.isBotTyping = false; // Hide typing indicator
//           }, this.responseDelay);
//           console.error('Error:', err);
//         }
//       });
//   }
//   private fetchTotalMaintenance(email: string) {
//     this.http.get<any[]>(`http://localhost:5000/maintenance/${email}`).subscribe(
//       (data) => {
//         if (!data || data.length === 0) {
//           this.chatLog.push({ sender: 'bot', message: 'No maintenance records found for this email.' });
//           return;
//         }
  
//         const total = data.reduce((sum, record) => sum + (record.amount || 0), 0);
//         this.chatLog.push({ sender: 'bot', message: `Total maintenance paid: ₹${total}` });
//       },
//       (error) => {
//         this.chatLog.push({ sender: 'bot', message: 'Failed to fetch maintenance data. Please try again.' });
//         console.error('Error fetching total maintenance:', error);
//       }
//     );
//   }
  
//   private fetchMaintenanceData(email: string) {
//     this.http.get<any[]>(`http://localhost:5000/maintenance/${email}`).subscribe(
//       (data) => {
//         if (data.length === 0) {
//           this.chatLog.push({ sender: 'bot', message: 'No maintenance records found for this email.' });
//           return;
//         }
  
//         data.forEach((record, index) => {
//           const paymentInfo = `Maintenance Record ${index + 1}:\nAmount: ₹${record.amount}\nMonth: ${record.month}\nPaid On: ${new Date(record.paymentDate).toDateString()}`;
//           this.chatLog.push({ sender: 'bot', message: paymentInfo });
//         });
//       },
//       (error) => {
//         this.chatLog.push({ sender: 'bot', message: 'Failed to fetch maintenance data. Please try again.' });
//         console.error('Error fetching maintenance data:', error);
//       }
//     );
//   }
  
//   private fetchVisitorDetails(email: string) {
//     this.http.get<any>(`http://localhost:5000/visitor/${email}`).subscribe(
//       (data) => {
//         console.log(data)
//         const visitorInfo = `Visitor Details:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`;
//         this.chatLog.push({
//           sender: 'bot',
//           message: visitorInfo,
//           image: data.image ? `${this.baseImageUrl}${data.image}` : undefined
//         });
//       },
//       (error) => {
//         this.chatLog.push({ sender: 'bot', message: 'Visitor not found. Please check the email and try again.' });
//         console.error('Failed to fetch visitor details:', error);
//       }
//     );
//   }
  
//   private fetchResidentDetails(email: string) {
//     this.http.get<any>(`http://localhost:5000/resident/${email}`).subscribe(
//       (data) => {
//         // Format resident details without image path in the message
//         const residentInfo = `Resident Details:\nName: ${data.name}\nEmail: ${data.email}\nApartment: ${data.apartment}\nPhone: ${data.phone}`;
//         // Push a single entry with message and image URL
//         this.chatLog.push({
//           sender: 'bot',
//           message: residentInfo,
//           image: data.image ? `${this.baseImageUrl}${data.image}` : undefined
//         });
//         // Fetch user data after getting resident details
//         this.getUserData();
//       },
//       (error) => {
//         this.chatLog.push({ sender: 'bot', message: 'Failed to fetch resident details. Please try another email.' });
//         console.error('Failed to fetch resident details:', error);
//       }
//     );
//   }

//   private getUserData() {
//     const token = sessionStorage.getItem('token');
//     const storedEmail = sessionStorage.getItem('email');

//     if (!token || !storedEmail) {
//       // this.chatLog.push({ sender: 'bot', message: 'User not authenticated. Please log in.' });
//       return;
//     }

//     this.http
//       .get<{ email: string; username: string }>('http://localhost:5000/getUser', {
//         headers: new HttpHeaders({
//           Authorization: `Bearer ${token}`,
//           'X-User-Email': storedEmail
//         })
//       })
//       .subscribe(
//         (response) => {
//           console.log('Fetched user:', response);
//           if (response && response.email === storedEmail) {
//             sessionStorage.setItem('username', response.username); // Store username
//             this.chatLog.push({ sender: 'bot', message: `User verified: ${response.username}` });
//           } else {
//             this.chatLog.push({ sender: 'bot', message: 'Email does not match database.' });
//             console.error('Email does not match database');
//           }
//         },
//         (error) => {
//           this.chatLog.push({ sender: 'bot', message: 'Error fetching user data.' });
//           console.error('Error fetching user:', error);
//         }
//       );
//   }

//   // Sanitize image URL for safe rendering
//   sanitizeImageUrl(url: string): SafeUrl {
//     return this.sanitizer.bypassSecurityTrustUrl(url);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     window.location.href = '/admin-login';
//   }
// }


import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage = '';
  chatLog: { sender: string, message: string, image?: string }[] = [];
  isBotTyping = false; // Tracks typing state
  private adminKeywords = ['admin', 'system', 'status']; // Keywords for admin questions
  private responseDelay = 300; // 1.5 seconds delay
  // private greetingKeywords = ['hi', 'hy', 'hey', 'hello','hyy']; // Greetings
  private greetingKeywords = [
  'hi', 'hello', 'hey', 'hy', 'hii', 'hyy', 'heyy', 'hola', 'bonjour', 'namaste',
  'yo', 'greetings', 'good morning', 'good afternoon', 'good evening',
  'morning', 'evening', 'afternoon', 'hello there', 'hey there',
  'hi there', 'what’s up', 'sup', 'yo bro', 'yo man', 'hi buddy', 'hey buddy',
  'hey friend', 'hey bot', 'hi bot', 'hello bot', 'hello assistant',
  'howdy', 'hiya', 'helloo', 'hellooo', 'hello friend', 'hi again',
  'good day', 'salutations', 'peace', 'what’s going on', 'hey you',
  'hi ya', 'hi mate', 'hi dude', 'hey dude', 'hello mate', 'yo dude',
  'yo buddy', 'hi team', 'hey team', 'hello world', 'hi assistant', 'hi AI'
];

  private howAreYouKeywords = ['how are you', 'how you doing', 'how’s it going']; // How are you variants
  private helpKeywords = ['help', 'i need help', 'i need you', 'assist me']; // Help requests
  private allResidentsKeywords = ['all residents', 'resident list', 'show all residents'];
  private residentKeywords = ['resident', 'residents', 'tenant', 'tenants'];
  private allVisitorKeywords = ['all visitors', 'list visitors', 'show visitors'];
  private visitorKeywords = ['visitor', 'visitors', 'guest', 'guests']; // Visitor queries
  private visitorPurposeKeywords = ['purpose','visitor purpose', 'visit purpose', 'visitor entry'];
  private maintenanceKeywords = ['maintenance', 'maintenance record', 'payment history', 'maintenance data'];
  private totalMaintenanceKeywords = ['total maintenance', 'total payment', 'maintenance summary', 'total maintenance amount'];
  private eventKeywords = ['event', 'events', 'show events', 'all events'];
  private feedbackKeywords = ['feedback', 'feedbacks', 'user feedback', 'show feedback'];
  private noticeKeywords = ['notice', 'notices', 'show notice', 'important notice'];
  private complaintKeywords = ['complaint', 'complaints', 'issue', 'problem'];
  private parkingPendingKeywords = ['parking request', 'pending parking'];
  private parkingApprovedKeywords = ['approved parking', 'granted parking'];
  private parkingRejectedKeywords = ['rejected parking', 'denied parking'];

  private expectingTotalMaintenanceEmail = false;
  private expectingMaintenanceEmail = false;
  private expectingVisitorEmail = false; // Flag for visitor email
  private expectingEmail = false; // Tracks if bot is waiting for an email
  private expectingVisitorPurposeEmail = false; 
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex
  private baseImageUrl = 'http://localhost:5000'; // Base URL for image paths
  

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Add user message to chat log immediately
    this.chatLog.push({ sender: 'user', message: this.userMessage });
    this.isBotTyping = true; // Show typing indicator

    const userMessageLower = this.userMessage.trim().toLowerCase();

    // Check if expecting an email and validate email format
    if (this.expectingEmail && this.emailRegex.test(this.userMessage.trim())) {
      const email = this.userMessage.trim();
      setTimeout(() => {
        this.fetchResidentDetails(email);
        this.isBotTyping = false; // Hide typing indicator
      }, this.responseDelay);
      setTimeout(() => {
        this.fetchTotalMaintenance(email);
        this.isBotTyping = false; // Hide typing indicator
      }, this.responseDelay);
      this.userMessage = '';
      this.expectingEmail = false;
      return;
    }else if (this.expectingVisitorEmail && this.emailRegex.test(this.userMessage.trim())) {
      const email = this.userMessage.trim();
      setTimeout(() => {
        this.fetchVisitorDetails(email); // Fetch visitor info
        this.isBotTyping = false;
      }, this.responseDelay);
      this.userMessage = '';
      this.expectingVisitorEmail = false;
      return;
    } else if (this.expectingMaintenanceEmail && this.emailRegex.test(this.userMessage.trim())) {
      const email = this.userMessage.trim();
      setTimeout(() => {
        this.fetchMaintenanceData(email);
        this.isBotTyping = false;
      }, this.responseDelay);
      this.userMessage = '';
      this.expectingMaintenanceEmail = false;
      return;
    }else if (this.expectingTotalMaintenanceEmail && this.emailRegex.test(this.userMessage.trim())) {
      const email = this.userMessage.trim();
      setTimeout(() => {
        this.fetchTotalMaintenance(email);
        this.isBotTyping = false;
      }, this.responseDelay);
      this.userMessage = '';
      this.expectingTotalMaintenanceEmail = false;
      return;
    }else if (this.expectingVisitorPurposeEmail && this.emailRegex.test(this.userMessage.trim())) {
  const email = this.userMessage.trim();
  setTimeout(() => {
    this.fetchFullVisitorPurpose(email); // new function
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  this.expectingVisitorPurposeEmail = false;
  return;
}
    else if (this.expectingEmail) {
      // Invalid email format
      setTimeout(() => {
        this.chatLog.push({ sender: 'bot', message: 'Please provide a valid email address.' });
        this.isBotTyping = false; // Hide typing indicator
      }, this.responseDelay);
      this.userMessage = '';
      return;
    }

    // Check for greetings (hi, hy, hey, hello)
    if (this.greetingKeywords.includes(userMessageLower)) {
      setTimeout(() => {
        this.chatLog.push({ sender: 'bot', message: 'Hi! How can I help you?' });
        this.isBotTyping = false; // Hide typing indicator
      }, this.responseDelay);
      this.userMessage = '';
      return;
    }

    // Check for "how are you" or similar
    if (this.howAreYouKeywords.includes(userMessageLower)) {
      setTimeout(() => {
        this.chatLog.push({ sender: 'bot', message: 'I am good. What about you?' });
        this.isBotTyping = false; // Hide typing indicator
      }, this.responseDelay);
      this.userMessage = '';
      return;
    }

    // Check for help requests
    if (this.helpKeywords.some(keyword => userMessageLower.includes(keyword))) {
      setTimeout(() => {
        this.chatLog.push({ sender: 'bot', message: 'Tell me. I am here to help you sir!' });
        this.isBotTyping = false; // Hide typing indicator
      }, this.responseDelay);
      this.userMessage = '';
      return;
    }

    
  if (this.allResidentsKeywords.some(k => userMessageLower.includes(k))) {
    setTimeout(() => {
      this.fetchAllResidents();
      this.isBotTyping = false;
    }, this.responseDelay);
    this.userMessage = '';
    return;
  }

  if (this.allVisitorKeywords.some(keyword => userMessageLower.includes(keyword))) {
  this.fetchAllVisitors();
  this.isBotTyping = false;
  this.userMessage = '';
  return;
 }

    // Check for resident queries
    if (this.residentKeywords.some(keyword => userMessageLower.includes(keyword))) {
      setTimeout(() => {
        this.chatLog.push({ sender: 'bot', message: 'Please provide the resident email ID' });
        this.isBotTyping = false; // Hide typing indicator
      }, this.responseDelay);
      this.expectingEmail = true; // Set flag to expect email in next message
      this.userMessage = '';
      return;
    }
    // Check for visitor queries
if (this.visitorKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.chatLog.push({ sender: 'bot', message: 'Please provide the visitor email ID' });
    this.isBotTyping = false;
  }, this.responseDelay);
  this.expectingVisitorEmail = true;
  this.userMessage = '';
  return;
}
// Check for maintenance queries
if (this.maintenanceKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.chatLog.push({ sender: 'bot', message: 'Please provide the resident email ID to fetch maintenance data.' });
    this.isBotTyping = false;
  }, this.responseDelay);
  this.expectingMaintenanceEmail = true;
  this.userMessage = '';
  return;
}

// Check for visitor purpose queries
if (this.visitorPurposeKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.chatLog.push({ sender: 'bot', message: 'Please provide the visitor email ID to fetch all purpose details.' });
    this.isBotTyping = false;
  }, this.responseDelay);
  this.expectingVisitorPurposeEmail = true; // Set the flag
  this.userMessage = '';
  return;
}
if (this.eventKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.fetchEvents();
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  return;
}

if (this.feedbackKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.fetchFeedbacks();
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  return;
}

if (this.noticeKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.fetchNotices();
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  return;
}

// Check for complaint queries
if (this.complaintKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.fetchComplaints(); // 👈 call the function below
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  return;
}

if (this.parkingPendingKeywords.some(k => userMessageLower.includes(k))) {
  setTimeout(() => {
    this.fetchParkingByCategory('requests');
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  return;
}

if (this.parkingApprovedKeywords.some(k => userMessageLower.includes(k))) {
  setTimeout(() => {
    this.fetchParkingByCategory('accepted');
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  return;
}

if (this.parkingRejectedKeywords.some(k => userMessageLower.includes(k))) {
  setTimeout(() => {
    this.fetchParkingByCategory('rejected');
    this.isBotTyping = false;
  }, this.responseDelay);
  this.userMessage = '';
  return;
}




// Check for total maintenance queries
if (this.totalMaintenanceKeywords.some(keyword => userMessageLower.includes(keyword))) {
  setTimeout(() => {
    this.chatLog.push({ sender: 'bot', message: 'Please provide the resident email ID to fetch total maintenance paid.' });
    this.isBotTyping = false;
  }, this.responseDelay);
  this.expectingTotalMaintenanceEmail = true;
  this.userMessage = '';
  return;
}





    // Check if the message contains admin keywords
    const isAdminQuestion = this.adminKeywords.some(keyword =>
      userMessageLower.includes(keyword)
    );

    // Send message to backend for other cases
    this.http
      .post<any>('http://localhost:5000/chatbot', {
        message: this.userMessage,
        isAdmin: isAdminQuestion // Pass admin flag to backend
      })
      .subscribe({
        next: (response) => {
          setTimeout(() => {
            this.chatLog.push({ sender: 'bot', message: response.reply });
            this.isBotTyping = false; // Hide typing indicator
          }, this.responseDelay);
          this.userMessage = '';
        },
        error: (err) => {
          setTimeout(() => {
            this.chatLog.push({ sender: 'bot', message: 'Sorry, something went wrong. Please try again.' });
            this.isBotTyping = false; // Hide typing indicator
          }, this.responseDelay);
          console.error('Error:', err);
        }
      });
  }

private fetchEvents() {
  this.http.get<any[]>(`http://localhost:5000/events`).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No events found.' });
        return;
      }

      data.forEach((event, index) => {
        const eventInfo = `Event ${index + 1}:\nTitle: ${event.title}\nDescription: ${event.description}\nDate: ${new Date(event.date).toLocaleDateString()}\nTime: ${event.time}`;
        this.chatLog.push({ sender: 'bot', message: eventInfo });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch events. Please try again.' });
      console.error('Error fetching events:', error);
    }
  );
}

private fetchFeedbacks() {
  this.http.get<any[]>(`http://localhost:5000/feedback`).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No feedbacks found.' });
        return;
      }

      data.forEach((feedback, index) => {
        const feedbackInfo = `Feedback ${index + 1}:\nName: ${feedback.name}\nEmail: ${feedback.email}\nMessage: ${feedback.message}`;
        this.chatLog.push({ sender: 'bot', message: feedbackInfo });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch feedbacks.' });
      console.error('Error fetching feedbacks:', error);
    }
  );
}


  private fetchTotalMaintenance(email: string) {
    this.http.get<any[]>(`http://localhost:5000/maintenance/${email}`).subscribe(
      (data) => {
        if (!data || data.length === 0) {
          this.chatLog.push({ sender: 'bot', message: 'No maintenance records found for this email.' });
          return;
        }
  
        const total = data.reduce((sum, record) => sum + (record.amount || 0), 0);
        this.chatLog.push({ sender: 'bot', message: `Total maintenance paid: ₹${total}` });
      },
      (error) => {
        this.chatLog.push({ sender: 'bot', message: 'Failed to fetch maintenance data. Please try again.' });
        console.error('Error fetching total maintenance:', error);
      }
    );
  }

  private fetchNotices() {
  this.http.get<any[]>(`http://localhost:5000/notices`).subscribe(
    (data) => {

      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No notices found.' });
        return;
      }

      data.forEach((notice, index) => {
        const noticeInfo = `Notice ${index + 1}:\nTitle: ${notice.content}\nDate: ${new Date(notice.createdAt).toLocaleDateString()}`;
        this.chatLog.push({ sender: 'bot', message: noticeInfo });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch notices.' });
      console.error('Error fetching notices:', error);
    }
  );
}

private fetchComplaints() {
  this.http.get<any[]>(`http://localhost:5000/complaint`).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No complaints found.' });
        return;
      }

      data.forEach((item, index) => {
        const complaintInfo = `Complaint ${index + 1}:\nResident: ${item.residentName}\nApartment: ${item.apartmentNumber}\nComplaint: ${item.complaint}\nDate: ${new Date(item.date).toLocaleString()}`;
        this.chatLog.push({ sender: 'bot', message: complaintInfo });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch complaints.' });
      console.error('Error fetching complaints:', error);
    }
  );
}

private fetchParkingByCategory(category: 'accepted' | 'rejected' | 'requests') {
  const url = `http://localhost:5000/parking/${category}`;
  this.http.get<any[]>(url).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: `No ${category} parking records found.` });
        return;
      }

      data.forEach((record, index) => {
        const info = `Parking ${index + 1}:\nName: ${record.residentName}\nEmail: ${record.email}\nApartment: ${record.apartment}\nStatus: ${record.status}${record.parkingNumber ? `\nParking No: ${record.parkingNumber}` : ''}`;
        this.chatLog.push({ sender: 'bot', message: info });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: `Failed to fetch ${category} parking data.` });
      console.error(`Error fetching ${category} parking:`, error);
    }
  );
}

private fetchAllResidents() {
  this.http.get<any[]>('http://localhost:5000/residents/list').subscribe(
    (data) => {
      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No residents found.' });
        return;
      }

      data.forEach((resident, index) => {
        const info = `Resident ${index + 1}:\nName: ${resident.name}\nEmail: ${resident.email}\nApartment: ${resident.apartment}\nPhone: ${resident.phone}`;
        this.chatLog.push({
          sender: 'bot',
          message: info,
          image: resident.image ? `${this.baseImageUrl}${resident.image}` : undefined
        });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch residents.' });
      console.error('Error fetching residents:', error);
    }
  );
}

fetchAllVisitors() {
  this.http.get<any[]>('http://localhost:5000/visitors/list').subscribe(
    (visitors) => {
      if (visitors.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No visitors found.' });
        return;
      }

      visitors.forEach((visitor, index) => {
        const info = `Visitor ${index + 1}:\nName: ${visitor.name}\nEmail: ${visitor.email}\nPhone: ${visitor.phone}`;
        this.chatLog.push({
          sender: 'bot',
          message: info,
          image: visitor.image ? `${this.baseImageUrl}${visitor.image}` : undefined
        });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch visitors.' });
      console.error('Error fetching visitors:', error);
    }
  );
}


  private fetchMaintenanceData(email: string) {
    this.http.get<any[]>(`http://localhost:5000/maintenance/${email}`).subscribe(
      (data) => {
        if (data.length === 0) {
          this.chatLog.push({ sender: 'bot', message: 'No maintenance records found for this email.' });
          return;
        }
  
        data.forEach((record, index) => {
          const paymentInfo = `Maintenance Record ${index + 1}:\nAmount: ₹${record.amount}\nMonth: ${record.month}\nPaid On: ${new Date(record.paymentDate).toDateString()}`;
          this.chatLog.push({ sender: 'bot', message: paymentInfo });
        });
      },
      (error) => {
        this.chatLog.push({ sender: 'bot', message: 'Failed to fetch maintenance data. Please try again.' });
        console.error('Error fetching maintenance data:', error);
      }
    );
  }
  
//   private fetchVisitorDetails(email: string) {
//     this.http.get<any>(`http://localhost:5000/visitor/${email}`).subscribe(
//       (data) => {
//         console.log(data)
//         const visitorInfo = `Visitor Details:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`;
//         this.chatLog.push({
//           sender: 'bot',
//           message: visitorInfo,
//           image: data.image ? `${this.baseImageUrl}${data.image}` : undefined
//         });
//         this.fetchVisitorPurposeByEmail(data.email);
//       },
//       (error) => {
//         this.chatLog.push({ sender: 'bot', message: 'Visitor not found. Please check the email and try again.' });
//         console.error('Failed to fetch visitor details:', error);
//       }
//     );
//   }
  
//   private fetchVisitorPurposeByEmail(email: string) {
//   this.http.get<any[]>(`http://localhost:5000/visitor-purpose/${email}`).subscribe(
//     (data) => {
//       if (!data || data.length === 0) {
//         this.chatLog.push({ sender: 'bot', message: 'No visitor purpose records found.' });
//         return;
//       }

//       data.forEach((record, index) => {
//         const purposeInfo = `Visit ${index + 1}:\nName: ${record.name}\nEmail: ${record.email}\nPurpose: ${record.purpose}\nBlock: ${record.block}\nFlat No: ${record.flatNo}\nTime: ${new Date(record.timestamp).toLocaleString()}`;
//         this.chatLog.push({ sender: 'bot', message: purposeInfo });
//       });
//     },
//     (error) => {
//       this.chatLog.push({ sender: 'bot', message: 'Failed to fetch visitor purpose records.' });
//       console.error('Error fetching visitor purposes:', error);
//     }
//   );
// }

  private fetchVisitorDetails(email: string) {
  this.http.get<any>(`http://localhost:5000/visitor/${email}`).subscribe(
    (data) => {
      console.log(data);
      const visitorInfo = `Visitor Details:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}`;
      this.chatLog.push({
        sender: 'bot',
        message: visitorInfo,
        image: data.image ? `${this.baseImageUrl}${data.image}` : undefined
      });

      // ✅ Only show purpose info from visitor-purpose table
      this.fetchPurposeOnly(email);
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Visitor not found. Please check the email and try again.' });
      console.error('Failed to fetch visitor details:', error);
    }
  );
}

private fetchPurposeOnly(email: string) {
  this.http.get<any[]>(`http://localhost:5000/visitor-purpose/${email}`).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No visitor purpose records found.' });
        return;
      }

      data.forEach((record, index) => {
        const purposeOnly = `Visit ${index + 1}\n Purpose: ${record.purpose} (on ${new Date(record.timestamp).toLocaleString()})`;
        this.chatLog.push({ sender: 'bot', message: purposeOnly });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch visitor purpose records.' });
      console.error('Error fetching visitor purposes:', error);
    }
  );
}

private fetchFullVisitorPurpose(email: string) {
  this.http.get<any[]>(`http://localhost:5000/visitor-purpose/${email}`).subscribe(
    (data) => {
      if (!data || data.length === 0) {
        this.chatLog.push({ sender: 'bot', message: 'No visitor purpose records found.' });
        return;
      }

      data.forEach((record, index) => {
        const fullPurposeInfo = `Purpose ${index + 1}:\nName: ${record.name}\nEmail: ${record.email}\nPurpose: ${record.purpose}\nBlock: ${record.block}\nFlat No: ${record.flatNo}\nTime: ${new Date(record.timestamp).toLocaleString()}`;
        this.chatLog.push({ sender: 'bot', message: fullPurposeInfo });
      });
    },
    (error) => {
      this.chatLog.push({ sender: 'bot', message: 'Failed to fetch full visitor purpose records.' });
      console.error('Error fetching full visitor purposes:', error);
    }
  );
}


  private fetchResidentDetails(email: string) {
    this.http.get<any>(`http://localhost:5000/resident/${email}`).subscribe(
      (data) => {
        // Format resident details without image path in the message
        const residentInfo = `Resident Details:\nName: ${data.name}\nEmail: ${data.email}\nApartment: ${data.apartment}\nPhone: ${data.phone}`;
        // Push a single entry with message and image URL
        this.chatLog.push({
          sender: 'bot',
          message: residentInfo,
          image: data.image ? `${this.baseImageUrl}${data.image}` : undefined
        });
        // Fetch user data after getting resident details
        this.getUserData();
      },
      (error) => {
        this.chatLog.push({ sender: 'bot', message: 'Failed to fetch resident details. Please try another email.' });
        console.error('Failed to fetch resident details:', error);
      }
    );
  }

  private getUserData() {
    const token = sessionStorage.getItem('token');
    const storedEmail = sessionStorage.getItem('email');

    if (!token || !storedEmail) {
      // this.chatLog.push({ sender: 'bot', message: 'User not authenticated. Please log in.' });
      return;
    }

    this.http
      .get<{ email: string; username: string }>('http://localhost:5000/getUser', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
          'X-User-Email': storedEmail
        })
      })
      .subscribe(
        (response) => {
          console.log('Fetched user:', response);
          if (response && response.email === storedEmail) {
            sessionStorage.setItem('username', response.username); // Store username
            this.chatLog.push({ sender: 'bot', message: `User verified: ${response.username}` });
          } else {
            this.chatLog.push({ sender: 'bot', message: 'Email does not match database.' });
            console.error('Email does not match database');
          }
        },
        (error) => {
          this.chatLog.push({ sender: 'bot', message: 'Error fetching user data.' });
          console.error('Error fetching user:', error);
        }
      );
  }

  // Sanitize image URL for safe rendering
  sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/admin-login';
  }
}
